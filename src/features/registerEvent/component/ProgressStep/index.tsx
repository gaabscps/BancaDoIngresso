/* eslint-disable no-self-compare */
import React from 'react';
import { ReactComponent as TriagingFaceDown } from '@/assets/images/svg/TriagingFaceDown.svg';
import { ReactComponent as CheckStep } from '@/assets/images/svg/CheckStep.svg';
import { useEvent } from '../../hook/useEvent';

interface ProgressStepProps {
  steps: {
    Component: JSX.Element;
    title: string;
  }[];
  currentStep: number;
}

export const ProgressStep = ({ currentStep, steps }: ProgressStepProps): JSX.Element => {
  const { eventState, onChange: onChangeEvent } = useEvent();
  // gerate steps with status todo, done and current
  const newSteps =
    steps &&
    steps.map((step, index) => {
      if (index < currentStep) {
        return { ...step, status: 'done' };
      }
      if (index === currentStep) {
        return { ...step, status: 'current' };
      }
      return { ...step, status: 'todo' };
    });

  const handleClickStep = (step: number): void => {
    // TODO: add validation to change step
    // if (step < currentStep) {
    onChangeEvent({ ...eventState, currentStep: step });
    // }
  };

  return (
    <div className="container-fluid mainContainer">
      <div className="progress-step">
        {newSteps.map((step, index) => {
          const { status } = step;
          return (
            <>
              <div
                className="progress-step__item"
                key={index}
                onClick={() => handleClickStep(index)}
              >
                <div className="progress-step__item__status">
                  <div className={`progress-step__item__status__${status}`}>
                    {status === 'current' && (
                      <>
                        <TriagingFaceDown />
                      </>
                    )}
                    {status === 'done' && (
                      <span>
                        <CheckStep />
                      </span>
                    )}
                    {status !== 'done' && <span>{index + 1}</span>}
                  </div>
                </div>
                <div className="progress-step__item__title">
                  <span className={`progress-step__item__title__${status}`}>{step.title}</span>
                </div>
              </div>
              {index < newSteps.length - 1 && (
                <div className="progress-step__line">
                  <div className={`progress-step__line__${status}`} />
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
