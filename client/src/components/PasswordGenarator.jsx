import { XMarkIcon } from "@heroicons/react/24/solid";
import { genaratePassword } from "../Api/genarateApi.js";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
function PasswordGenarator() {
  const [password, setPassword] = useState("");
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [loading, setLoading] = useState(false);

  const [passwordLength, setPasswordLength] = useState(8);

  const handlePassword = async (e) => {
    e.preventDefault();

    try {
      if (!lower && !upper && !number && !symbols) {
        toast.error("Please add input!");
      } else {
        setLoading((curr) => !curr);
        const response = await genaratePassword({
          lower,
          upper,
          number,
          symbols,
          passwordLength,
        });

        if (response.data.genarate) {
          setTimeout(() => {
            setLoading((curr) => !curr);
          }, 500);
          setPassword(response.data.password);
        } else {
          setLoading((curr) => !curr);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = () => {
    if (password) {
      toast.success("Copied..");
    }
  };

  return (
    <div className="w-max mx-auto text-white   p-5 border-4 border-blue-gray-900 rounded-tl-2xl rounded-br-2xl">
      <form action="" onSubmit={handlePassword}>
        <h2 className="text-lg font-medium text-center mb-4">
          Strong Password Generator
        </h2>
        <div className="password-wrapper">
          <div className="password-area">
            <div
              className={`${
                !loading && "flex"
              } password bg-blue-gray-200 p-4 rounded-md shadow-md`}
            >
              {!loading ? (
                <>
                  <input
                    type="text"
                    value={password}
                    className="w-full bg-transparent outline-none"
                  />
                  <XMarkIcon
                    className="w-8 cursor-pointer"
                    onClick={() => setPassword("")}
                  />
                </>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
        <div className="setting mt-6">
          <h3 className="text-md font-semibold mb-2">
            Customize your password
          </h3>
          <div className="">
            <div className="checkbox-field">
              <input
                type="checkbox"
                id="lower"
                className="mr-2"
                checked={lower}
                onClick={() => setLower(!lower)}
              />
              <label htmlFor="lower">Include LowerCase (a-z)</label>
            </div>
            <div className="checkbox-field">
              <input
                type="checkbox"
                id="upper"
                className="mr-2"
                checked={upper}
                onClick={() => setUpper(!upper)}
              />
              <label htmlFor="upper">Include UpperCase (A-Z)</label>
            </div>
            <div className="checkbox-field">
              <input
                type="checkbox"
                id="numbers"
                className="mr-2"
                checked={number}
                onClick={() => setNumber(!number)}
              />
              <label htmlFor="numbers">Include Numbers (0-9)</label>
            </div>
            <div className="checkbox-field">
              <input
                type="checkbox"
                id="symbols"
                className="mr-2"
                checked={symbols}
                onClick={() => setSymbols(!symbols)}
              />
              <label htmlFor="symbols">Include Symbols (&-#)</label>
            </div>
          </div>
        </div>
        <div className="password-length mt-6">
          <h3 className="text-md font-semibold mb-2">Password Length</h3>
          <div className="flex items-center">
            <p className="rangeValue text-sm">{passwordLength}</p>
            <div className="flex-1 ml-4">
              <input
                type="range"
                min={8}
                max={40}
                defaultValue={passwordLength}
                onChange={(e) => setPasswordLength(e.currentTarget.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="buttons mt-6">
          <CopyToClipboard onCopy={handleCopy} text={password}>
            <button
              type="button"
              className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md mr-4"
            >
              Copy Password
            </button>
          </CopyToClipboard>

          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md"
          >
            Generate Password
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default PasswordGenarator;
