"use client";
import React from "react";
import type { CardComponentProps } from "onborda";
import { useOnborda } from "onborda";
import { XIcon } from "lucide-react";

// Shadcn
import { Button } from "@nextui-org/button";
import {
  Card,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { CardBody } from "@material-tailwind/react";
import confetti from "canvas-confetti";

const CustomCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}) => {
  // Onborda hooks
  const { closeOnborda } = useOnborda();

  function handleConfetti() {
    closeOnborda();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <Card isFooterBlurred radius="lg" className="border-none min-w-6">
      <CardHeader>
        <Button className="absolute top-0 right-0" isIconOnly variant="ghost" onClick={() => closeOnborda()}>
            <XIcon size={16} />
        </Button>
      </CardHeader>
      <CardBody>
        <div>
            <div className="mb-2 text-lg">
                {step.icon}{step.title}
            </div>
            <div>
              <b>{currentStep + 1}</b> of <b>{totalSteps}</b>
            </div>
        </div>
        <div>{step.content}</div>
      </CardBody>
      
      <CardFooter>
        <div className="flex justify-between w-full">
          {currentStep !== 0 && (
            <Button onClick={() => prevStep()}>Previous</Button>
          )}
          {currentStep + 1 !== totalSteps && (
            <Button onClick={() => nextStep()} className="ml-2">
              Next
            </Button>
          )}
          {currentStep + 1 === totalSteps && (
            <Button onClick={() => handleConfetti()} className="ml-2">
              🎉 Finish!
            </Button>
          )}
        </div>
      </CardFooter>
      <span className="text-card">{arrow}</span>
    </Card>
  );
};

export default CustomCard;
