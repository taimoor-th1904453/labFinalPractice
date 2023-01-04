'use-client';

import Link from "next/link";
import './globals.css'
import { useRouter,usePathname  } from "next/Navigation";
import { Badge, Button, IconButton, Stack, TextField } from "@mui/material";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    console.log(pathname)

  return (
    <header>
      <Stack
        component="nav"
        direction="row"
        justifyContent="space-between"
        sx={{ padding: 2 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Link href="/">
            <Button>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ef/International_Flag_of_Planet_Earth.svg"
                alt="Planet Earth Flag"
                width="20"
              />
            </Button>
          </Link>

          <Link  href="/countries">
            <Button sx={pathname == "/countries" ? { my: 2, color: 'red' } : { my: 2}}>Countries</Button>
          </Link>
          <Link href="/favourites">
            <Button  sx={pathname == "/favourites" ? { my: 2, color: 'red' } : { my: 2}}>Favourites</Button>
          </Link>
          <Link href="/">
            <Button  sx={pathname == "/" ? { my: 2, color: 'red' } : { my: 2}}>Egg</Button>
          </Link>
          {/* <Teams /> */}
        </Stack>
      </Stack>
    </header>
  );
}
