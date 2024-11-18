"use client";

// import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Participant } from "../../participents/participants";
import { useMemo, useState } from "react";
import { zone } from "@/lib/constants";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Props = {
  participantsData: Participant[];
};
export function CollageWiseChart({ participantsData }: Props) {
  const [selectedZone, setSelectedZone] = useState<string>("");

  const filteredParticipants = useMemo(() => {
    if (!selectedZone) {
      return participantsData;
    }
    return participantsData.filter(
      (participant) => participant.zone === selectedZone
    );
  }, [selectedZone, participantsData]);

  const collegeWiseData = filteredParticipants.reduce((acc, participant) => {
    const college = participant.collage;
    if (!acc[college]) {
      acc[college] = 0;
    }
    acc[college] += 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(collegeWiseData).map((college) => ({
    college,
    participants: collegeWiseData[college],
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Zone wise Participants Chart</CardTitle>
        <CardDescription>
          Total number of participants{" "}
          {Object.values(collegeWiseData).reduce(
            (total, count) => total + count,
            0
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={(zone) => setSelectedZone(zone)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Zone</SelectLabel>
                {zone.map((zone, i) => (
                  <SelectItem key={i} value={zone.value}>
                    {zone.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            width={100}
            height={300}
            margin={{
              top: 20,
            }}
          >
            {" "}
            {/* Adjust height here */}
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="college"
              tickLine={false}
              tickMargin={10}
              className="text-xs text-wrap w-full"
              axisLine={false}
              tickFormatter={(value) => {
                return value.length > 15 ? `${value.slice(0, 15)}...` : value;
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="participants" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* Optional footer content */}
      </CardFooter>
    </Card>
  );
}
