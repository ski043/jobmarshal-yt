"use client";

import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryList } from "@/app/utils/countriesList";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export function JobFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //get currnet filters from the URL
  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";

  function clearAllFilter() {
    router.push("/");
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  function handleJobTypeChange(jobType: string, checked: boolean) {
    const current = new Set(currentJobTypes);

    if (checked) {
      current.add(jobType);
    } else {
      current.delete(jobType);
    }

    const newValue = Array.from(current).join(",");

    router.push(`?${createQueryString("jobTypes", newValue)}`);
  }

  function handleLocationChange(location: string) {
    router.push(`?${createQueryString("location", location)}`);
  }

  return (
    <Card className="col-span-1 h-fit">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
        <Button
          onClick={clearAllFilter}
          variant="destructive"
          size="sm"
          className="h-8"
        >
          <span>Clear All</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>
      <Separator className="mb-4" />

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Job Type</Label>
          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((job, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  onCheckedChange={(checked) => {
                    handleJobTypeChange(job, checked as boolean);
                  }}
                  id={job}
                  checked={currentJobTypes.includes(job)}
                />
                <Label className="text-sm font-medium" htmlFor={job}>
                  {job}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Location</Label>

          <Select
            onValueChange={(location) => {
              handleLocationChange(location);
            }}
            value={currentLocation}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Worldwide</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌍</span>
                  <span className="pl-2">Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((country) => (
                  <SelectItem key={country.code} value={country.name}>
                    <span>{country.flagEmoji}</span>
                    <span className="pl-2">{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
