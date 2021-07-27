//
//  record.tsx
//  web
//
//  Created by d-exclaimation on 16:10.
//

import { SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useMemo } from "react";
import IncidentView from "../components/record/IncidentView";
import NavBar from "../components/shared/NavBar";
import Main from "../components/shared/semantic/Main";
import { initialFetch } from "../data/initialFetch";
import { NewIncident, RIncident } from "../models/Incident";

type Props = {
  data: RIncident[];
};

const Record: React.FC<Props> = ({ data }) => {
  const database = useMemo(() => data.map(NewIncident), [JSON.stringify(data)]);
  return (
    <>
      <NavBar />
      <Main>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
          spacing="3vmin"
          m="3vmin"
        >
          {database.map((x) => (
            <IncidentView key={x.id} data={x} />
          ))}
        </SimpleGrid>
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const qlimit = typeof query.limit === "string" ? parseInt(query.limit) : 10;
  const limit = isNaN(qlimit) ? 10 : qlimit;
  const initial = await initialFetch(limit);
  if (!initial.data)
    return {
      notFound: true,
    };
  return {
    props: {
      data: initial.data,
    },
  };
};

export default Record;
