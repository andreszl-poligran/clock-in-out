import { ClipLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className="flex flex-col gap-3 justify-center bg-[#151E24] items-center w-screen h-screen">
      <ClipLoader color="#CACACA" size={40} />
    </div>
  )
}

export default Loading
