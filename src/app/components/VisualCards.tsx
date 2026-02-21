"use client";

import React from 'react';
import {
    TrendingUp,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    ShieldCheck,
    Zap,
    Star
} from 'lucide-react';
import clsx from 'clsx';

// --- Types ---

export interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    isPositive?: boolean;
    icon: React.ReactNode;
    trend?: number[]; // Simple array of numbers for sparkline
    primaryColor?: string;
}

export interface ComparisonCardProps {
    items: {
        title: string;
        features: string[];
        price: string;
        isPopular?: boolean;
        image: string;
    }[];
    primaryColor?: string;
}

export interface ProfileCardProps {
    name: string;
    role: string;
    status: 'online' | 'offline' | 'busy';
    avatar: string;
    stats: { label: string; value: string }[];
    primaryColor?: string;
}

// --- Components ---

/**
 * Metric Card with Sparkline and Trend
 */
export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon, trend, primaryColor }) => {
    const colorClass = primaryColor || 'var(--secondary-violet-text)';

    return (
        <div className="bg-container border-default border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: primaryColor ? `${primaryColor}1A` : 'var(--secondary-violet-text)1A', color: colorClass }}
                >
                    {icon}
                </div>
                <button className="text-secondary-text hover:text-primary-text transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
            <div>
                <p className="text-sm font-medium text-secondary-text mb-1 uppercase tracking-wider">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-primary-text">{value}</h3>
                    <span className={clsx(
                        "flex items-center text-sm font-semibold",
                        isPositive ? "text-success-text" : "text-danger-text"
                    )}>
                        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {change}
                    </span>
                </div>
            </div>

            {trend && (
                <div className="mt-4 h-12 w-full flex items-end gap-1">
                    {trend.map((h, i) => (
                        <div
                            key={i}
                            className={clsx(
                                "flex-1 rounded-t-sm transition-all duration-500",
                                isPositive ? "bg-success-text/40 hover:bg-success-text" : "bg-danger-text/40 hover:bg-danger-text"
                            )}
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

/**
 * Comparison Card for Pricing or Plans
 */
export const ComparisonCard: React.FC<ComparisonCardProps> = ({ items, primaryColor }) => {
    const colorClass = primaryColor || 'var(--ai-accent-fill)';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className={clsx(
                        "relative flex flex-col p-8 rounded-3xl border-default border transition-all duration-300",
                        item.isPopular ? "bg-primary-text text-brand-text scale-105 z-10 shadow-xl" : "bg-container shadow-sm hover:translate-y-[-4px]"
                    )}
                >
                    {item.isPopular && (
                        <div
                            className="absolute top-0 right-8 -translate-y-1/2 text-brand-text text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1"
                            style={{ backgroundColor: colorClass }}
                        >
                            <Star className="w-3 h-3 fill-current" /> Most Popular
                        </div>
                    )}

                    <div className="mb-6 overflow-hidden rounded-2xl h-32 w-full">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" />
                    </div>

                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-extrabold">{item.price}</span>
                        <span className={item.isPopular ? "text-brand-text/60" : "text-secondary-text"}>/per month</span>
                    </div>

                    <ul className="space-y-4 mb-8 flex-grow">
                        {item.features.map((feature, fidx) => (
                            <li key={fidx} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5" style={{ color: item.isPopular ? 'var(--success-text)' : colorClass }} />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        className={clsx(
                            "w-full py-4 rounded-xl font-bold transition-all active:scale-95",
                            item.isPopular
                                ? "bg-brand-text text-primary-text hover:bg-brand-text/90"
                                : "text-brand-text"
                        )}
                        style={!item.isPopular ? { backgroundColor: colorClass } : {}}
                    >
                        Get Started
                    </button>
                </div>
            ))}
        </div>
    );
};

/**
 * Modern User Profile Card
 */
export const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, status, avatar, stats, primaryColor }) => {
    const colorClass = primaryColor || 'var(--secondary-violet-text)';

    return (
        <div className="bg-container border-default border rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div
                className="relative h-24"
                style={{ background: `linear-gradient(to right, ${colorClass}, var(--ai-accent-fill))` }}
            >
                <div className="absolute -bottom-10 left-6">
                    <div className="relative">
                        <img
                            src={avatar}
                            alt={name}
                            className="w-20 h-20 rounded-2xl border-4 border-container object-cover shadow-md group-hover:rotate-3 transition-transform duration-300"
                        />
                        <div className={clsx(
                            "absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-container",
                            status === 'online' ? "bg-success-text" : status === 'busy' ? "bg-danger-text" : "bg-disabled-text"
                        )} />
                    </div>
                </div>
            </div>

            <div className="pt-12 p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h4 className="text-xl font-bold text-primary-text">{name}</h4>
                        <p className="text-sm text-secondary-text">{role}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 border-default border rounded-lg hover:bg-sunk-fill transition-colors">
                            <Zap className="w-4 h-4" style={{ color: colorClass }} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-default pt-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <span className="block text-xs text-secondary-text uppercase mb-1">{stat.label}</span>
                            <span className="block text-base font-bold text-primary-text">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
