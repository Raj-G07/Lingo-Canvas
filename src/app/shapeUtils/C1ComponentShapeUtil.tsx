import React, { useEffect, useState } from "react";
import { BaseBoxShapeUtil, HTMLContainer, type TLResizeInfo } from "tldraw";
import type { C1ComponentShape } from "../shapes/C1ComponentShape";
import { ResizableContainer } from "../components/ResizableContainer";
import { C1Component, ThemeProvider } from "@thesysai/genui-sdk";
import { AiIcon } from "../components/AiIcon";
import { useLocale } from "@/app/context/LocaleContext";
import { SUPPORTED_LOCALES } from "@/app/utils/translate";
import { MetricCard, ComparisonCard, ProfileCard } from "../components/VisualCards";
import clsx from "clsx";

// A React component wrapper to make the tldraw custom shape reactive to context changes
const LocalizedC1Component = ({ shape, themeMode }: { shape: C1ComponentShape, themeMode: "light" | "dark" }) => {
  const { locale, t } = useLocale();

  const promptToRender = shape.props.prompt || "";
  const responseToRender = shape.props.c1Response || "";

  if (!shape.props.c1Response) {
    return (
      <HTMLContainer>
        <div
          className={clsx(
            "w-full h-full flex flex-col gap-1 items-center justify-center border border-[#7F56D917] outline-[#0000000F] bg-[#7F56D914] rounded-xl text-primary"
          )}
        >
          <AiIcon />
          <p className="text-md">{t("component.generating")}</p>
        </div>
      </HTMLContainer>
    );
  }

  return (
    <HTMLContainer
      className="flex flex-col gap-s"
      style={{
        overflow: "visible",
        pointerEvents: "all",
      }}
    >
      <ResizableContainer shape={shape} isStreaming={shape.props.isStreaming}>
        <ThemeProvider mode={themeMode}>
          {shape.props.prompt && (
            <div className="py-xs px-m rounded-md bg-container border-default border w-fit max-w-full line-clamp-1 overflow-hidden min-h-[30px]">
              {promptToRender}
            </div>
          )}
          <C1Component
            key={shape.id}
            c1Response={responseToRender}
            isStreaming={shape.props.isStreaming || false}
            customComponents={{
              MetricCard,
              ComparisonCard,
              ProfileCard
            }}
          />
        </ThemeProvider>
      </ResizableContainer>
    </HTMLContainer>
  );
};

export class C1ComponentShapeUtil extends BaseBoxShapeUtil<C1ComponentShape> {
  static override type = "c1-component" as const;

  getDefaultProps(): C1ComponentShape["props"] {
    return { w: 300, h: 150 };
  }

  // Override onResize to allow only width resizing
  override onResize = (
    shape: C1ComponentShape,
    info: TLResizeInfo<C1ComponentShape>
  ) => {
    const { scaleX } = info;

    // Calculate new width based on horizontal scale
    const newWidth = Math.max(400, shape.props.w * scaleX); // Minimum width of 400px

    return {
      props: {
        ...shape.props,
        w: newWidth,
        // Keep height unchanged - don't apply scaleY
        h: shape.props.h,
      },
    };
  };

  component = (shape: C1ComponentShape) => {
    const isDarkMode = this.editor.user.getIsDarkMode();
    // Ensure we always have a valid theme mode for ThemeProvider
    const themeMode = isDarkMode === true ? "dark" : "light";

    return <LocalizedC1Component shape={shape} themeMode={themeMode} />;
  };

  indicator(shape: C1ComponentShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
