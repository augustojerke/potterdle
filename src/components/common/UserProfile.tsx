import Image from "next/image";

interface UserProfileProps {
  username: string | undefined;
  house: string;
  points: number;
}

export function UserProfile({ username, house, points }: UserProfileProps) {
  let houseColor = "";
  switch (house.toLowerCase()) {
    case "gryffindor":
      houseColor = "bg-red-700 text-yellow-300";
      break;
    case "slytherin":
      houseColor = "bg-green-700 text-white";
      break;
    case "ravenclaw":
      houseColor = "bg-blue-700 text-white";
      break;
    case "hufflepuff":
      houseColor = "bg-yellow-500 text-black";
      break;
    default:
      houseColor = "bg-gray-500 text-white";
  }

  let rank = "";
  let rankColor = "";
  if (points >= 100) {
    rank = "Dark Lord";
    rankColor = "bg-black text-white";
  } else if (points >= 80) {
    rank = "Minister of Magic";
    rankColor = "bg-purple-700 text-white";
  } else if (points >= 60) {
    rank = "Professor";
    rankColor = "bg-indigo-600 text-white";
  } else if (points >= 40) {
    rank = "Wizard";
    rankColor = "bg-blue-600 text-white";
  } else if (points >= 20) {
    rank = "Apprentice";
    rankColor = "bg-green-500 text-white";
  } else {
    rank = "Muggle";
    rankColor = "bg-gray-500 text-white";
  }

  return (
    <div className="p-5 border rounded-lg shadow-md flex flex-col items-center text-center">
      <Image
        src="/harryUser.png"
        alt="user"
        width={100}
        height={100}
        className="mb-4"
      />
      <p className="font-bold">{username}</p>
      <div className="flex justify-center items-center gap-5">
        <div
          className={`mt-2 px-4 py-2 text-center font-semibold rounded ${houseColor}`}
        >
          {house}
        </div>
        <div className={`mt-2 px-4 py-2 rounded font-semibold ${rankColor}`}>
          {rank}
        </div>
      </div>
    </div>
  );
}
