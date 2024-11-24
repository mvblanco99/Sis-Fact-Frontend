import { Button, Label, TextInput } from "flowbite-react";

const Login = () => {

  return (
    <div className="w-full h-screen flex flex-col gap-y-4 justify-center items-center">

       <div>Bienvendio a SIS-FACT</div>
       <div className="border-2 border-gray-200 p-4 rounded-md">
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                    </div>
                    <TextInput id="username" type="text" placeholder="" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput id="password" type="password" required />
                </div>
                <Button type="submit">Submit</Button>
            </form>
       </div>
    </div>
  );
}
   
export default Login