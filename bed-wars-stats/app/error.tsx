"use client";

import { useEffect } from "react";
import { Card } from "@heroui/card";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card
      isBlurred
      shadow="sm"
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-4xl mx-auto w-full overflow-hidden p-4 sm:p-6 rounded-xl mb-10"
    >
      <section className="flex flex-col items-center justify-center gap-6 py-6 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Error occurred while searching. Please try again later
        </h1>
      </section>
    </Card>
  );
}
