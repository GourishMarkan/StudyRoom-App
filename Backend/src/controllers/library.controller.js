const { z } = require("zod");

const { LibraryController } = require(".");

const multer = require("multer");
const express = require("express");
const cloudinary = require("cloudinary").v2;

const { upload } = require("multer");
const { Library } = require("../models/library.model");
const { db } = require("../models/user.model");
const { Booking } = require("../models/booking.model");



const LibrarySchema = z.object({
  name: z.string(),
  longDescription: z.string(),
  shortDescription: z.string(),
  // thumbnail: z.string(),

  location: z.string(),
  price: z.number(),
  // tags: z.array(z.string()),
  // reviews: z.string().uuid().optional(), // Assuming the ObjectId is a UUID; adjust as necessary

  amenities: z.array(z.string()).optional(), // Marked as optional to handle the 'required: optional'
  seatLayout: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
    })
  ),
  seatbooked: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
      })
    )
    .optional(),
  timeSlot: z.object({
    from: z.string(),
    to: z.string(),
  }),
});

// Ping admin dummy API
const pingAdmin = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ping admin dummy API",
  });
};

// Assuming LibraryController.createLibrary is an async function
const createLibrary = async (req, res) => {
  try {



    console.log(req.files,'=================>');
    const uploadedFiles = {};
    for (const field in req.files) {
      if (req.files[field].length === 1) { // Single file
        uploadedFiles[field] = req.files[field][0].filename;
      } else { // Multiple files (array)
        uploadedFiles[field] = req.files[field].map((file) => file.filename);
      }
    }

    console.log(uploadedFiles, "uploadedFiles");  
    // const images = req.files.map((file) => file.path);
    

    return res.json({ images });




    const jsonData = JSON.parse(req.body.jsonData);

    const {
      libraryOwner,
      name,
      longDescription,
      shortDescription,
      address,

      price,

      amenities,


      timeSlot,



      legal,


         gstNumber,


cinNumber,


         tanNumber,


         msmeNumber,


      
 


    } = jsonData;


    if (!name || !location) {
      return res.status(400).json({ error: "Name and location are required." });
    }

    console.log(
      name,
      longDescription,
      shortDescription,
      address,
      location,
      price,
      amenities,
      timeSlot,
      cardImage,
      images,
      legal,
      gstDetails,
      cinDetails,
      tanDetails,
      msmeDetails

    
    )
//     const libraryData = {
//       libraryOwner,
//       name,
//       longDescription,
//       shortDescription,
//       address,
//       // location,
//       price,

//       amenities,


//       timeSlot,


//       cardImage : uploadedFiles.card,
//       images : uploadedFiles.images,
//       legal,


// gstDetails.gstNumber : gstNumber,
// gstDetails.gstCertificate :  uploadedFiles.gst,

// cinDetails.cinNumber : cinNumber,
// cinDetails.cinCertificate : uploadedFiles.cin,

// tanDetails.tanNumber : tanNumber,
// tanDetails.tanCertificate : uploadedFiles.tan,

// msmeDetails.msmeNumber : msmeNumber,
// msmeDetails.msmeCertificate : uploadedFiles.msme,
            
//     }





    console.log("-----libraryr data-- ", libraryData, "------");

    const LibraryData = await Library.create(libraryData);
    await LibraryData.save();


    res.status(201).json({
      message: "Library created successfully",
      library: LibraryData,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};






// createRoom
const createRoom = async (req, res) => {
  try {
    const {
      libraryId,
      roomNo,
      seatLayout,
    } = req.body;
const roomData = {
      roomNo,
      seatLayout,
    };
    const room = await Library.findByIdAndUpdate({_id: libraryId},{
      rooms: roomData
    });

    if (!room) {
      return res.status(400).json({ error: "Library not found" });
    }


    await LibraryData.save();
    console.log("-----libraryr data-- ", libraryData, "------");
    res.status(201).json({
      message: "Library created successfully",
      Library: LibraryData,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// get all rooms

const getLibrary = async (req, res) => {
  try {
    const roomsData = await Library.find();
    res.status(200).json({
      success: true,
      count: roomsData.length,
      data: roomsData,
    });
  } catch (error) {
    console.error("Error fetching library data:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve library rooms. Please try again later.",
    });
  }
};

// get room by id
const getLibraryById = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const room = await Library.findById(id);
    res.status(200).json({
      success: true,
      message: "Library data",
      data: room,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "cannot get room" });
  }
};
const updateApproveStatus = async (req, res) => {
  console.log(req.body, "reqqq");
  const { id, status } = req.body;
  try {
    const room = await Library.findByIdAndUpdate(id, {
      approved: status,
    });
    console.log(room?.approved);
    res.status(200).json({
      success: true,
      message: "Library status ",
      data: room,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "cannot get room" });
  }
};

const getAdminLibraries = async (req, res) => {
  try {
    const { userId } = req.body; // Assuming the userId is passed as a URL parameter
    console.log(userId, "userId");
    const libraries = await Library.find({ libraryOwner: userId });
    console.log(libraries, "libraries");
    res.json({
      message: "Libraries retrieved successfully",
      data: libraries,
    });
  } catch (error) {
    console.error("Error retrieving libraries by user _id:", error);
    res.status(500).json({ error: "Cannot retrieve libraries" });
  }
};

async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.find().populate("userId").exec();
    return res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  pingAdmin,
  createLibrary,
  getLibrary,
  getLibraryById,
  updateApproveStatus,
  getAdminLibraries,
  getAllBookings,
};
