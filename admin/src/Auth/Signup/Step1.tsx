export const StepOne = ({ nextStep, userInfo, setUserInfo }) => (
  <div>
    <h2 className="">Step 1</h2>
    <div className="flex  flex-col justify-start gap-2  mb-4">
      <h3 className="font-bold">Enter Phone Number</h3>
      <div className="flex justify-start border border-black bg-white">
        <label
          className=" w-32  py-2  text-black  h-[50px] justify-center items-center
        text-center border border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          +91
        </label>
        <input
          type="number"
          // className="px-4 py-2 w-[410px] border-2 border-black  text-base bg-white text-gray-400"
          value={userInfo?.phone.toString()}
          placeholder="Phone"
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              phone: e.target.value ? parseInt(e.target.value, 10) : 0,
            })
          }
          style={{ border: "none", justifyContent: "center" }}
        />
      </div>
      {/* email */}
      <div className="">
        <label className="font-bold">Enter Email ID</label>
        <input
          type="email"
          value={userInfo.email}
          placeholder="Email"
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
      </div>
      {/* password */}
      <div>
        <label className="font-bold">Enter Password</label>
        <input
          type="password"
          value={userInfo.password}
          placeholder="Password"
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
        />
      </div>
    </div>

    <button
      className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"
      onClick={nextStep}
    >
      Next
    </button>
  </div>
);
