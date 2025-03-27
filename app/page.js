import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata = {
  title: "Gorilla-Technology Task",
  description: "",
};


export default async function Home() {
  //INFO:- SERVER BASED COMPONENT
  const taskRes = await fetch("https://nextjs-boilerplate-five-plum-29.vercel.app/api/tasks");
  const tasks = await taskRes.json();
  //TODO:- Get the user completed object of array
  const completeuerObject = tasks.reduce((acc, task) => {
    acc[task.userId] = acc[task.userId] || [];
    acc[task.userId].push(task.completed);
    return acc;
  }, {});

  //TODO:- Convert object to array then filter all true then extract that userid into array
  const completedUserId = Object.entries(completeuerObject)
    .filter(([_, taskList]) => taskList.every(Boolean))
    .map(([userId]) => userId);

  console.log("💀 ~ Home ~ qualifiedUserIds:", completedUserId)

  //TODO:- use this array to get user infomation promise based
  const userDetails = await Promise.all(
    completedUserId.map(id =>
      fetch(`https://nextjs-boilerplate-five-plum-29.vercel.app/api/users/${id}`).then(res => res.json())
    )
  );
  //TODO:- Asending order

  const sortedUserDetails =  userDetails.sort((a, b) => a.name.localeCompare(b.name) || a.id - b.id || a.email.localeCompare(b.email));




  return (
    <div className="container mx-auto max-sm:px-3">

      <Table>
        <TableCaption>All task Completed User Information.</TableCaption>
        <TableHeader>
          <TableRow className={"bg-black text-white border-b border-white hover:bg-black"}>
            <TableHead className="w-[100px] text-white font-bold">User ID</TableHead>
            <TableHead className="w-[100px] text-white font-bold">Name</TableHead>
            <TableHead className="w-[100px] text-white font-bold">Email</TableHead>
            {/* <TableHead className="text-right">Task</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUserDetails.map((data, index) => (
            <TableRow key={index} className={`${index % 2 == 0 ? 'bg-gray-200 hover:bg-gray-100' :''} border-b border-white`}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              {/* <TableCell className="text-right">$250.00</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
