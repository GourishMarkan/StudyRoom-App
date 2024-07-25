import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@/lib/utils";
import LocationSelector from "./LocationSelector";
import Seats from "../seatinglayout/SeatLayout";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Progress } from "@/components/ui/progress";

const CreateRoom: React.FC = () => {
  const [libraryId, setLibraryId] = React.useState("");
  const [libraryData, setLibraryData] = React.useState([]);
  const [seatLayout, setSeatLayout] = React.useState("");
  const [price, setPrice] = React.useState(libraryData?.price || "");
  const [timeSlot, setTimeSlot] = React.useState("");
  const [location, setLocation] = React.useState(null);
  const [loading, setLoading] = useState(false); // Step 1: Loading state
  const [rooms, setRooms] = useState([]);
  const [progress, setProgress] = React.useState(13);
  const [selectedRoom, setSelectedRoom] = useState([]);

  const [selectedLibrary, setSelectedLibrary] = useState(null);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/v1/library/getAllLibrary`
        );
        console.log(response.data.data);
        setLibraryData(response.data.data);
        setSelectedRoom(response.data.data?.rooms);
      } catch (error) {
        console.error("Error fetching library:", error);
        // Handle error
      }
    };
    fetchLibrary();
  }, []);

  const [timeSlots, setTimeSlots] = useState([
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
  ]);
  const handleLocationSelect = (location: any) => {
    console.log("Selected Location:", location);
    setLocation(location);
  };

  const handleSeatSelect = (seat) => {
    // console.log(seat)

    setSeatLayout(seat);
    // console.log(seatLayout);
    // setSeatLayout((prev) => [...prev, seat]);
  };
  const handleTimeChange = (index, type, newValue): any => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][type] = newValue;
    setTimeSlots(updatedTimeSlots);
    // console.log(updatedTimeSlots);
  };

  const handleLibraryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLibraryId(event.target.value);
<<<<<<< HEAD
=======

>>>>>>> 5ce7fee4ea55a0730e496f9bddd8e0b70763d594
  };

  useEffect(() => {
    const libraryObject = libraryData.find(
      (library) => library?._id === libraryId
    );
    setSelectedLibrary(libraryObject);
  }, [libraryId]);
  console.log(selectedLibrary);

  const createRoom = async () => {
    console.log("Creating Room", libraryId, seatLayout);
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASEURL}/api/v1/library/createRoom`,
        {
          libraryId: libraryId,
          seatLayout: seatLayout,
        }
      );
      console.log(response.data, "Room Created");
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };

  const addDetails = async () => {
    const formattedTimeSlots = timeSlots.map((timeSlot) => ({
      ...timeSlot,
      from: timeSlot.from ? dayjs(timeSlot.from).format("hh:mm A") : null,
      to: timeSlot.to ? dayjs(timeSlot.to).format("hh:mm A") : null,
    }));

    console.log(formattedTimeSlots);
    // console.log(seatLayout);

    console.log("Adding Details", libraryId, price, timeSlot, location);
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/library/updateRoom`,
        {
          libraryId: libraryId,
          price: price,
          timeSlot: formattedTimeSlots,
          location: location,
        }
      );
      console.log(response.data, "Room Details Added");
      setLoading(false);
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };

<<<<<<< HEAD
=======
  function handlePriceChange(index, newValue) {
    // Assuming timeSlots is part of your component's state
    // and you have a method to update this state
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].price = newValue;
    setTimeSlots(updatedTimeSlots); // Update your state with the new timeSlots array
  }


>>>>>>> 5ce7fee4ea55a0730e496f9bddd8e0b70763d594
  const handleSubmit = async () => {
    try {
      if(!libraryId){
        toast.error("Please relogin, NO library Exists")
      }


      await createRoom();

      await addDetails();
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };


  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
<<<<<<< HEAD
    return <Progress value={progress} className="w-[60%]" />;
=======
    return <Progress value={progress} className="w-[60%]" />
>>>>>>> 5ce7fee4ea55a0730e496f9bddd8e0b70763d594
  }
  return (
    <div className="flex flex-col bg-gray-100 items-center  gap-y-25 overflow-y-scroll h-screen mb-20">
      <div className="mt-20 ">
        <select value={libraryId} onChange={handleLibraryChange}>
          <option value="">Select a Library</option>
          {libraryData?.map((library: any) => (
            <option
              key={library._id}
              value={library._id}
              className="bg-gray-500  rounded-lg mt-2 mb-5  p-10"
            >
              {library.name}
            </option>
          ))}
        </select>
        {/* Other form elements */}
      </div>

      <div className="mt-20  h-96">

        <Seats onSeatSelect={handleSeatSelect} />
      </div>

      <div className="w-[90%] mx-20 mt-60">
        <h2 className="text-center">Select Time Slots</h2>
        {timeSlots.map((timeRange, index) => (
<<<<<<< HEAD
          <div
            key={index}
            className="flex justify-evenly items-center bg-gray-200 p-2 rounded-lg mt-2 mb-5 rounded-xl"
          >
            <TimePicker
              label="From"
              value={timeRange.from}
              onChange={(newValue: any) =>
                handleTimeChange(index, "from", newValue)
              }
            />
            <TimePicker
              label="To"
              value={timeRange.to}
              onChange={(newValue: any) =>
                handleTimeChange(index, "to", newValue)
              }
            />
=======
          <div className="flex-col  justify-center items-center">
            <div
              key={index}
              className="flex justify-evenly items-center bg-gray-200 p-2 mt-2 mb-5 rounded-xl"
            >

              <TimePicker
                label="From"
                value={timeRange.from}
                onChange={(newValue) => handleTimeChange(index, "from", newValue)}
              />
              <TimePicker
                label="To"
                value={timeRange.to}
                onChange={(newValue) => handleTimeChange(index, "to", newValue)}
              />
            </div>
            <div className="max-w-[30%] flex  flex-col  justify-center items-cente">

            <input
              type="number"
              className="form-input rounded-md ml-60"
              value={timeRange.price}
              onChange={(e) => handlePriceChange(index, e.target.value)}
              placeholder="Price"
              />
              </div>
>>>>>>> 5ce7fee4ea55a0730e496f9bddd8e0b70763d594
          </div>
        ))}
      </div>

      <div className=" w-full h-96 mt-20 mb-20 flex justify-center items-center rounded-lg">
        <LocationSelector onLocationSelect={handleLocationSelect} />
      </div>
      <div className="flex-col  h-96 mt-20 mb-20 flex justify-center items-center rounded-lg">
<<<<<<< HEAD
        {selectedLibrary?.price && (
          <p>
            This price will be updated for all the rooms in the library
            {selectedLibrary?.price}
          </p>
        )}
        <input
          type="number"
          placeholder="Price"
          className="border-2 border-gray-300 rounded-lg p-2"
          onChange={(e) => setPrice(e.target.value)}
        />
=======


>>>>>>> 5ce7fee4ea55a0730e496f9bddd8e0b70763d594
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit"}{" "}
            {/* Step 3: Conditional rendering */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
