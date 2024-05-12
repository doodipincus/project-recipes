const timeNow = new Date()

export const chartConfig = {
    type: 'bar',
    height: 500,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: '',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#020617', '#FF5733', '#33FF57', '#5733FF'],
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
        categories: [
          timeNow.getDate() - 6,
          timeNow.getDate() - 5,
          timeNow.getDate() - 4,
          timeNow.getDate() - 3,
          timeNow.getDate() - 2,
          timeNow.getDate() - 1,
          timeNow.getDate(),
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
        tickAmount: 4,
        min: 0,
        max: 20,
      },
      grid: {
        show: true,
        borderColor: '#dddddd',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: 'dark',
      },
    },
  };



  

  export interface DataSort {
    users: {
      a: number;
      b: number;
      c: number;
      d: number;
      e: number;
      f: number;
      g: number;
    };
    recipes: {
      a: number;
      b: number;
      c: number;
      d: number;
      e: number;
      f: number;
      g: number;
    };
    festivals: {
      a: number;
      b: number;
      c: number;
      d: number;
      e: number;
      f: number;
      g: number;
    };
    reviews: {
      a: number;
      b: number;
      c: number;
      d: number;
      e: number;
      f: number;
      g: number;
    };
  }
  
  export interface TimeFromData {
    createdAt:string
  }
  export const inital = {
    users: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 },
    recipes: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 },
    festivals: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 },
    reviews: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 },
  };


  export const sorted = (time: string, key: keyof DataSort, setDataSort: React.Dispatch<React.SetStateAction<DataSort>>) => {
    const dayOfWeek = new Date(time).getDate();

    const dayDifference = dayOfWeek - timeNow.getDate();

    switch (dayDifference) {
      case -6:
        setDataSort((prevDataSort) => ({
          ...prevDataSort,
          [key]: { ...prevDataSort[key], a: prevDataSort[key].a + 1 },
        }));
        break;
      case -5:
        setDataSort((prevDataSort) => ({
          ...prevDataSort,
          [key]: { ...prevDataSort[key], b: prevDataSort[key].b + 1 },
        }));
        break;
      case -4:
        setDataSort((prevDataSort) => ({
          ...prevDataSort,
          [key]: { ...prevDataSort[key], c: prevDataSort[key].c + 1 },
        }));
        break;
      case -3:
        setDataSort((prevDataSort) => ({
          ...prevDataSort,
          [key]: { ...prevDataSort[key], d: prevDataSort[key].d + 1 },
        }));
        break;
      case -2:
        setDataSort((prevDataSort) => ({
          ...prevDataSort,
          [key]: { ...prevDataSort[key], e: prevDataSort[key].e + 1 },
        }));
        break;
      case -1:
        setDataSort((prevDataSort) => ({
          ...prevDataSort,
          [key]: { ...prevDataSort[key], f: prevDataSort[key].f + 1 },
        }));
        break;
      case 0:
        setDataSort((prevDataSort) => ({
          ...prevDataSort,
          [key]: { ...prevDataSort[key], g: prevDataSort[key].g + 1 },
        }));
        break;
      default:
        console.log('אירוע ישן יותר');
        break;
    }
  };