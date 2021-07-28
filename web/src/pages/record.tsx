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
import MetaHead from "../components/shared/meta/MetaHead";
import Main from "../components/shared/semantic/Main";
import { initialFetch } from "../data/initialFetch";
import { useIncidentRecord } from "../hooks/useIncidentRecord";
import { NewIncident, RIncident } from "../models/Incident";

type Props = {
  data: RIncident[];
};

const Record: React.FC<Props> = ({ data }) => {
  const database = useMemo(() => data.map(NewIncident), [JSON.stringify(data)]);
  const { state } = useIncidentRecord(database);
  return (
    <Main>
      <MetaHead title="Incidents Record" description="All the incidents" />
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
        spacing="3vmin"
        m="3vmin"
      >
        {state.map((x) => (
          <IncidentView key={x.id} data={x} />
        ))}
      </SimpleGrid>
    </Main>
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
