import { Box, Flex, TextField } from "@radix-ui/themes";
import "./App.scss";
import "@radix-ui/themes/styles.css";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
const toBaidu = (wd: string) => {
  const url = `https://www.baidu.com/s?wd=${wd}`;
  window.location.href = url;
};
const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    const value = (e.currentTarget.value || "") as string;
    if (value.trim() === "") return;
    toBaidu(e.currentTarget.value);
  }
};
function App() {
  return (
    <Flex direction={"column"} align={"center"} gap="4">
      <Box>
        <img src="ldc.png" alt="ldc" />
      </Box>
      <Box className="w-full md:w-[730px]">
        <TextField.Root
          size="3"
          mx="2"
          placeholder="搜索一下"
          onKeyDown={onEnter}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
    </Flex>
  );
}
export default App;
