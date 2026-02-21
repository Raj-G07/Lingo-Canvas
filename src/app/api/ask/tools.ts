import type { RunnableToolFunctionWithParse } from "openai/lib/RunnableFunction.mjs";
import type { RunnableToolFunctionWithoutParse } from "openai/lib/RunnableFunction.mjs";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import type { JSONSchema } from "openai/lib/jsonschema.mjs";

type ThinkingStateCallback = (title: string, description: string) => void;

export function getImageSearchTool(writeThinkItem?: ThinkingStateCallback): RunnableToolFunctionWithParse<{ altText: string }> {
  return {
    type: "function",
    function: {
      name: "getImageSrc",
      description: "Get a high-quality public image URL based on the description",
      parse: JSON.parse,
      parameters: zodToJsonSchema(
        z.object({
          altText: z.string().describe("Descriptive text for the image"),
        })
      ) as JSONSchema,
      function: async ({ altText }: { altText: string }) => {
        if (writeThinkItem) {
          writeThinkItem("Finding public image...", `Searching for: ${altText}`);
        }

        // Clean up keywords for LoremFlickr (expects comma-separated tags)
        // Extract up to 3-4 key words if it's too long
        const cleanKeywords = altText
          .replace(/[^\w\s]/gi, '') // Remove special characters
          .split(/\s+/) // Split by whitespace
          .filter(word => word.length > 2) // Filter out short words
          .slice(0, 3) // Take top 3 keywords
          .join(',');

        const randomId = Math.floor(Math.random() * 10000);

        // If no keywords extracted, fallback to 'abstract'
        const tags = cleanKeywords || 'abstract';

        return `https://loremflickr.com/1000/1000/${tags}?lock=${randomId}`;
      },
      strict: true,
    },
  };
}

export function getAnalyticsTool(writeThinkItem?: ThinkingStateCallback): RunnableToolFunctionWithParse<{ topic: string, period: string }> {
  return {
    type: "function",
    function: {
      name: "getAnalyticsData",
      description: "Get structured analytics data for a specific topic and time period",
      parse: JSON.parse,
      parameters: zodToJsonSchema(
        z.object({
          topic: z.string().describe("The topic for analytics (e.g., 'sales', 'users', 'performance')"),
          period: z.enum(['daily', 'weekly', 'monthly']).describe("The time period for the data"),
        })
      ) as JSONSchema,
      function: async ({ topic, period }) => {
        if (writeThinkItem) {
          writeThinkItem("Gathering analytics...", `Aggregating ${period} data for ${topic}`);
        }

        // Mocking sophisticated analytics data
        return {
          title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Performance`,
          value: topic === 'sales' ? "$124.5k" : topic === 'users' ? "12,450" : "85%",
          change: "+12.5%",
          isPositive: true,
          trend: Array.from({ length: 12 }, () => Math.floor(Math.random() * 60) + 40),
          breakdown: [
            { label: "Growth", value: "High" },
            { label: "Sentiment", value: "Positive" },
            { label: "Retention", value: "92%" }
          ]
        };
      },
      strict: true,
    },
  };
}

export function getComparisonTool(writeThinkItem?: ThinkingStateCallback): RunnableToolFunctionWithParse<{ options: string[] }> {
  return {
    type: "function",
    function: {
      name: "getComparisonData",
      description: "Get detailed comparison data for multiple options",
      parse: JSON.parse,
      parameters: zodToJsonSchema(
        z.object({
          options: z.array(z.string()).describe("The items to compare"),
        })
      ) as JSONSchema,
      function: async ({ options }) => {
        if (writeThinkItem) {
          writeThinkItem("Comparing options...", `Analyzing ${options.join(' vs ')}`);
        }

        return {
          items: options.map((opt, i) => ({
            title: opt,
            price: i === 0 ? "Free" : `$${(i + 1) * 29}`,
            features: [
              "Standard Support",
              "Unlimited Projects",
              i > 0 ? "Advanced Analytics" : "Basic Analytics",
              i > 1 ? "Custom Domains" : "Subdomains only"
            ],
            isPopular: i === 1,
            image: `https://images.unsplash.com/photo-${1542273917363 + i}-3b1817f69a2d?q=80&w=400`
          }))
        };
      },
      strict: true,
    },
  };
}

export const tools = (writeThinkItem?: ThinkingStateCallback): (
  | RunnableToolFunctionWithoutParse
  | RunnableToolFunctionWithParse<any>
)[] => [
    getImageSearchTool(writeThinkItem),
    getAnalyticsTool(writeThinkItem),
    getComparisonTool(writeThinkItem),
  ];
