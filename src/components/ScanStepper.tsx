'use client';

import React from 'react';
import { ScanStep } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Search, UserCheck, Layers, Award, CheckCircle2 } from 'lucide-react';

interface ScanStepperProps {
  currentStep: ScanStep;
  progressPercent?: number;
}

export function ScanStepper({ currentStep, progressPercent }: ScanStepperProps) {
  const { t } = useLanguage();
  if (currentStep === 'idle') return null;

  const STEPS = [
    {
      id: 'discovering',
      label: t.stepper.step1Label,
      description: t.stepper.step1Desc,
      icon: Search,
    },
    {
      id: 'verifying',
      label: t.stepper.step2Label,
      description: t.stepper.step2Desc,
      icon: UserCheck,
    },
    {
      id: 'extracting',
      label: t.stepper.step3Label,
      description: t.stepper.step3Desc,
      icon: Layers,
    },
    {
      id: 'normalizing',
      label: t.stepper.step4Label,
      description: t.stepper.step4Desc,
      icon: Award,
    },
  ];

  const getStepIndex = (step: ScanStep): number => {
    switch (step) {
      case 'discovering':
        return 0;
      case 'verifying':
        return 1;
      case 'extracting':
        return 2;
      case 'normalizing':
        return 3;
      case 'completed':
        return 4;
      default:
        return 0;
    }
  };

  const activeIdx = getStepIndex(currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-850/90 dark:bg-obsidian-850/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-lg">
        {/* Step Progress Line */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isFinished = activeIdx > idx;
            const isCurrent = activeIdx === idx;
            const isPending = activeIdx < idx;

            return (
              <div
                key={step.id}
                className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                    : isFinished
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-obsidian-900/50 dark:bg-obsidian-900/50 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                    isCurrent
                      ? 'bg-amber-500 text-obsidian-950 ring-2 ring-amber-400/40 animate-pulse'
                      : isFinished
                      ? 'bg-emerald-500 text-obsidian-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isFinished ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={`text-xs font-semibold truncate ${
                      isCurrent
                        ? 'text-amber-400'
                        : isFinished
                        ? 'text-emerald-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 truncate">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
