"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { useQuery } from "@tanstack/react-query";
import CountryCard from "../../components/CountryCard";
import { useState } from "react";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

export default function Countries() {

  const {
    data: countries,
    isError,
    error,
    isLoading,
  } = useQuery(
    ["countries"],
    () => fetcher("http://localhost:3000/api/countries"),
    {
      suspense: true,
      retry: false,
    }
  );
  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <Grid container spacing={2}>
        {countries &&
          countries.map((country) => (
            <Grid
              key={country.alpha3}
              component="article"
              item
              xs={12}
              md={6}
              lg={4}
            >
              <CountryCard
              country = {country}
                alpha2={country.alpha2}
                alpha3={country.alpha3}
                nameAR={country.ar}
                nameEN={country.en}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
