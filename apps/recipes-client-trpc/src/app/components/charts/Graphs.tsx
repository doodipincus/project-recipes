import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import Chart from 'react-apexcharts';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { DataSort, TimeFromData, chartConfig, inital, sorted } from './utils';
import { DATA } from './query';

export default function Example() {
  const [dataSort, setDataSort] = useState<DataSort>(inital);

  const [getData, { data }] = useLazyQuery(DATA);
  console.log({ data });

  useEffect(() => {
    if (data && dataSort === inital) {
      data.allUsers.nodes.map((time: TimeFromData) => {
        sorted(time.createdAt, 'users', setDataSort);
      });
      data.allRecipes.nodes.map((time: TimeFromData) => {
        sorted(time.createdAt, 'recipes', setDataSort);
      });
      data.allFestivals.nodes.map((time: TimeFromData) => {
        sorted(time.createdAt, 'festivals', setDataSort);
      });
      data.allFavorites.nodes.map((time: TimeFromData) => {
        sorted(time.createdAt, 'reviews', setDataSort);
      });
    }
  }, [data]);

  useEffect(() => {
    getData();
  }, []);

  const series = [
    {
      name: 'משתמשים',
      data: [
        dataSort.users.a,
        dataSort.users.b,
        dataSort.users.c,
        dataSort.users.d,
        dataSort.users.e,
        dataSort.users.f,
        dataSort.users.g,
      ],
    },
    {
      name: 'מתכונים',
      data: [
        dataSort.recipes.a,
        dataSort.recipes.b,
        dataSort.recipes.c,
        dataSort.recipes.d,
        dataSort.recipes.e,
        dataSort.recipes.f,
        dataSort.recipes.g,
      ],
    },
    {
      name: 'לייקים',
      data: [
        dataSort.reviews.a,
        dataSort.reviews.b,
        dataSort.reviews.c,
        dataSort.reviews.d,
        dataSort.reviews.e,
        dataSort.reviews.f,
        dataSort.reviews.g,
      ],
    },
    {
      name: 'פסטיבלים',
      data: [
        dataSort.festivals.a,
        dataSort.festivals.b,
        dataSort.festivals.c,
        dataSort.festivals.d,
        dataSort.festivals.e,
        dataSort.festivals.f,
        dataSort.festivals.g,
      ],
    },
  ];

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div>
          <Typography variant="h6" color="blue-gray">
            גרפים ונתונים
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart
          series={series}
          {...chartConfig}
        />
      </CardBody>
    </Card>
  );
}
