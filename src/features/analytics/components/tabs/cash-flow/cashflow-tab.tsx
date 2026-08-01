"use client";

import {
    AnalyticsCashFlowAnalysis,
} from "../../../types/analytics-view";

import CashFlowSummaryCards from "./cashflow-summary-cards";

import CashFlowRunningBalanceChart from "./cashflow-running-balance-chart";

import CashFlowMonthlyOverview from "./cashflow-monthly-overview";

import LargestCashInflows from "./largest-cash-inflows";

import LargestCashOutflows from "./largest-cash-outflows";

import CashFlowInsights from "./cashflow-insights";

interface CashFlowTabProps {

    analysis:
    AnalyticsCashFlowAnalysis;

    currency: string;
}

export default function CashFlowTab({

    analysis,

    currency,

}: CashFlowTabProps) {

    return (

        <div className="space-y-8">

            <CashFlowSummaryCards

                summary={
                    analysis.summary
                }

                currency={
                    currency
                }

            />

            <CashFlowInsights

                insights={
                    analysis.insights
                }

            />

            <CashFlowRunningBalanceChart

                data={
                    analysis.monthly
                }

                currency={
                    currency
                }

            />

            <CashFlowMonthlyOverview

                months={
                    analysis.monthly
                }

                currency={
                    currency
                }

            />

            <div
                className="
                    grid
                    gap-6

                    xl:grid-cols-2
                "
            >

                <LargestCashInflows

                    transactions={
                        analysis.largestInflows
                    }

                    currency={
                        currency
                    }

                />

                <LargestCashOutflows

                    transactions={
                        analysis.largestOutflows
                    }

                    currency={
                        currency
                    }

                />

            </div>

        </div>
    );
}