import { RotateCw } from "lucide-react";
import { Button } from "./components/ui/button";
import { Slider } from "./components/ui/slider";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [randomText, setRandomText] = useState<string>("");
  const [length, setLength] = useState<number>(10);

  const generatePassword = (length: number): string => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomText = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomText);
    }
    return result;
  };

  const handleGenerateRandomText = useCallback(() => {
    const newRandomText = generatePassword(length); // You can specify the desired length
    setRandomText(newRandomText);
  }, [length]);

  useEffect(() => {
    handleGenerateRandomText();
  }, [handleGenerateRandomText, length]);

  return (
    <div className="bg-slate-50">
      <h1 className="text-3xl  text-center font-semibold mt-9">
        Generate Random Passwords for Stronger Security
      </h1>

      <div className="py-6 px-4 max-w-[35rem] w-full bg-white shadow-lg rounded-md  mx-auto mt-6">
        <h2 className="text-2xl font-bold text-center">Password Generator</h2>
        <div className="flex items-center gap-x-5 mt-8">
          <div className="border rounded-md py-1 pr-1 pl-5 basis-[80%] flex items-center gap-x-2">
            <p className="w-[75%] text-center">{randomText}</p>

            <h4 className="py-1.5 text-sm px-3 rounded-md text-white bg-primary">
              strong
            </h4>

            <Button onClick={handleGenerateRandomText} variant={"ghost"}>
              <RotateCw />
            </Button>
          </div>

          <Button size={"lg"} className="text-base">
            Copy
          </Button>
        </div>

        <div className="mt-5">
          Password length: <span className="border py-1.5 px-3">8</span>
        </div>
        <div className="mt-8 bg-yellow-50 rounded-md py-4 px-3">
          <Slider
            defaultValue={[length]}
            onValueChange={(e) => setLength(+e)}
            min={8}
            max={20}
            step={3}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
