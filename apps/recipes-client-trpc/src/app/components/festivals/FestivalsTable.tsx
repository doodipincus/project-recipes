import { FestivalBack } from '../../interfaces/festivals';
import { formatDateTime } from '../../utils/date';

interface Props {
  festivals: FestivalBack[];
}
const FestivalTable = ({ festivals }: Props) => {
  console.log('table', festivals);
  
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    שם
                  </th>
                  <th scope="col" className="px-6 py-4">
                    תאריך
                  </th>
                  <th scope="col" className="px-6 py-4">
                    פרטים
                  </th>
                  {/* <th scope="col" className="px-6 py-4">
                    מקום
                  </th> */}
                  <th scope="col" className="px-6 py-4">
                    מארגן
                  </th>
                </tr>
              </thead>
              <tbody>
                {festivals.map((festival, index) => (
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {festival.festival_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {formatDateTime(festival.festival_date_time)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {festival.festival_description}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {festival.festival_creator_email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FestivalTable;
