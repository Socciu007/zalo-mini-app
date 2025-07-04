import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import { Welcome } from "./welcome";
import { Categories } from "./categories";
import { BookingList } from "./booking-list";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto custom-scrollbar">
        {/* Categories */}
        <Suspense>
          <Categories />
        </Suspense>
        {/* Booking List */}
        <BookingList />
      </Box>
    </Page>
  );
};

export default HomePage;
