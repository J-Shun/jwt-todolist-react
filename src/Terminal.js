import tw, { styled } from "twin.macro";

const Terminal = styled.div(({ isDark }) => [
  tw`max-w-lg mx-auto border-2 bg-gray-700 mt-5`,
  isDark ? tw`border-white` : tw`border-gray-300`,
]);

export default Terminal;
