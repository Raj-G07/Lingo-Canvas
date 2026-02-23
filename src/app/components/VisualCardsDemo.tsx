"use client";

import React from 'react';
import {
    MetricCard,
    ComparisonCard,
    ProfileCard
} from './VisualCards';
import {
    TrendingUp,
    Users,
    DollarSign
} from 'lucide-react';
import { useLocale } from '@/app/context/LocaleContext';

export default function VisualCardsDemo() {
    const { t } = useLocale();

    return (
        <div className="p-8 bg-background-fill min-h-screen space-y-12">
            <section>
                <h2 className="text-2xl font-bold mb-6 text-primary-text">{t('card.section.metrics')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title={t('card.metric.revenue')}
                        value="$128,430"
                        change="+12.5%"
                        isPositive={true}
                        icon={<DollarSign />}
                        trend={[20, 30, 45, 40, 55, 70, 65, 80, 75, 90, 85, 100]}
                        primaryColor="#7F56D9"
                    />
                    <MetricCard
                        title={t('card.metric.users')}
                        value="12,450"
                        change="+5.2%"
                        isPositive={true}
                        icon={<Users />}
                        trend={[40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90, 95]}
                        primaryColor="#0BA57D"
                    />
                    <MetricCard
                        title={t('card.metric.churn')}
                        value="2.4%"
                        change="-0.8%"
                        isPositive={false}
                        icon={<TrendingUp />}
                        trend={[80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25]}
                        primaryColor="#F04438"
                    />
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 text-primary-text">{t('card.section.comparison')}</h2>
                <ComparisonCard
                    primaryColor="#7F56D9"
                    items={[
                        {
                            title: "demo.comparison.starter.title",
                            price: "Free",
                            features: ["demo.comparison.starter.feature1", "demo.comparison.starter.feature2", "demo.comparison.starter.feature3", "demo.comparison.starter.feature4"],
                            image: "https://loremflickr.com/400/400/startup?lock=1"
                        },
                        {
                            title: "demo.comparison.pro.title",
                            price: "$49",
                            features: ["demo.comparison.pro.feature1", "demo.comparison.pro.feature2", "demo.comparison.pro.feature3", "demo.comparison.pro.feature4"],
                            isPopular: true,
                            image: "https://loremflickr.com/400/400/business?lock=2"
                        }
                    ]}
                />
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 text-primary-text">{t('card.section.team')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ProfileCard
                        name="demo.profile.alex.name"
                        role="demo.profile.alex.role"
                        status="online"
                        avatar="https://loremflickr.com/200/200/face,man?lock=3"
                        stats={[
                            { label: "demo.profile.stat.projects", value: "12" },
                            { label: "demo.profile.stat.rating", value: "4.9" },
                            { label: "demo.profile.stat.active", value: "Yes" }
                        ]}
                        primaryColor="#7F56D9"
                    />
                    <ProfileCard
                        name="demo.profile.sarah.name"
                        role="demo.profile.sarah.role"
                        status="busy"
                        avatar="https://loremflickr.com/200/200/face,woman?lock=4"
                        stats={[
                            { label: "demo.profile.stat.commits", value: "324" },
                            { label: "demo.profile.stat.reviews", value: "45" },
                            { label: "demo.profile.stat.tasks", value: "8" }
                        ]}
                        primaryColor="#0BA57D"
                    />
                    <ProfileCard
                        name="demo.profile.marcus.name"
                        role="demo.profile.marcus.role"
                        status="offline"
                        avatar="https://loremflickr.com/200/200/face,manager?lock=5"
                        stats={[
                            { label: "demo.profile.stat.sprints", value: "24" },
                            { label: "demo.profile.stat.success", value: "98%" },
                            { label: "demo.profile.stat.impact", value: "High" }
                        ]}
                        primaryColor="#F79009"
                    />
                </div>
            </section>
        </div>
    );
}
