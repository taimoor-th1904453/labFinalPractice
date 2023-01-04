"use client";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {useState } from 'react'
import { useQuery, useMutation, QueryClient  } from "@tanstack/react-query";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";


const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};


export default function CountryCard({country, alpha2, alpha3, nameEN, nameAR }) {
    const [queryClient] = useState(() => new QueryClient());

    const addToFavorites = useMutation(async (country) => {
        await fetch(`http://localhost:3000/api/update`,
            {
                method: country.isInFavorites ? "DELETE" : "POST",
                body: JSON.stringify({
                    country: country.alpha2
                })
    
            });
    })
    const handle = () => {
        addToFavorites.mutate(country, { onSuccess: () => queryClient.invalidateQueries(["countries"])})}
        
  const { data } = useQuery(
    [`flag-${alpha2}`],
    async () => await fetcher(`http://localhost:3000/api/flags/${alpha2}`),
    {
      suspense: true,
      retry: false,
    }
  );
  return (
    <>
      <Card sx={{ border: "1px solid blue", maxWidth: 345 }}>
        <CardMedia sx={{ height: 250 }} image={data} title="country flag" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {alpha3} - {alpha2}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {nameAR}&nbsp;{nameEN}
          </Typography>
          <Link href={`/countries/${alpha2}`}>
            <Typography variant="body2" sx={{ padding: 2 }}>
              Subdivisions
            </Typography>
          </Link>
        </CardContent>
        <CardActions>
          <IconButton onClick={handle} aria-label="add to favorites">
            <FavoriteIcon  />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
