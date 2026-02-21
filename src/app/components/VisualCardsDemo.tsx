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

export default function VisualCardsDemo() {
    return (
        <div className="p-8 bg-background-fill min-h-screen space-y-12">
            <section>
                <h2 className="text-2xl font-bold mb-6 text-primary-text">Business Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Total Revenue"
                        value="$128,430"
                        change="+12.5%"
                        isPositive={true}
                        icon={<DollarSign />}
                        trend={[20, 30, 45, 40, 55, 70, 65, 80, 75, 90, 85, 100]}
                        primaryColor="#7F56D9"
                    />
                    <MetricCard
                        title="Active Users"
                        value="12,450"
                        change="+5.2%"
                        isPositive={true}
                        icon={<Users />}
                        trend={[40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90, 95]}
                        primaryColor="#0BA57D"
                    />
                    <MetricCard
                        title="Churn Rate"
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
                <h2 className="text-2xl font-bold mb-6 text-primary-text">Plan Comparison</h2>
                <ComparisonCard
                    primaryColor="#7F56D9"
                    items={[
                        {
                            title: "Starter",
                            price: "Free",
                            features: ["1 Project", "Basic Analytics", "Community Support", "Subdomains"],
                            image: "https://loremflickr.com/400/400/startup?lock=1"
                        },
                        {
                            title: "Professional",
                            price: "$49",
                            features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Custom Domains"],
                            isPopular: true,
                            image: "https://loremflickr.com/400/400/business?lock=2"
                        }
                    ]}
                />
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 text-primary-text">Team Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ProfileCard
                        name="Alex Rivera"
                        role="Design Director"
                        status="online"
                        avatar="https://loremflickr.com/200/200/face,man?lock=3"
                        stats={[
                            { label: "Projects", value: "12" },
                            { label: "Rating", value: "4.9" },
                            { label: "Active", value: "Yes" }
                        ]}
                        primaryColor="#7F56D9"
                    />
                    <ProfileCard
                        name="Sarah Chen"
                        role="Lead Developer"
                        status="busy"
                        avatar="https://loremflickr.com/200/200/face,woman?lock=4"
                        stats={[
                            { label: "Commits", value: "324" },
                            { label: "Reviews", value: "45" },
                            { label: "Tasks", value: "8" }
                        ]}
                        primaryColor="#0BA57D"
                    />
                    <ProfileCard
                        name="Marcus Volt"
                        role="Product Manager"
                        status="offline"
                        avatar="https://loremflickr.com/200/200/face,manager?lock=5"
                        stats={[
                            { label: "Sprints", value: "24" },
                            { label: "Success", value: "98%" },
                            { label: "Impact", value: "High" }
                        ]}
                        primaryColor="#F79009"
                    />
                </div>
            </section>
        </div>
    );
}
