import { LiaUniversitySolid } from "react-icons/lia";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const url = import.meta.env.VITE_API_URL + '/auth';
  const navigate = useNavigate();
  const userSchema = z.object({
    email: z.string(),
    senha: z.string() })
 
  const { register, handleSubmit } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  type UserSchema = z.infer<typeof userSchema>;

  const handleLoginData = async (data: UserSchema) => {
    console.log(url);
    const res = await axios.post(url, {
      "email" : data.email,
      "senha": data.senha
    });

    if (res.status === 201) {
      localStorage.setItem('token', res.data.accessToken);
      navigate('/');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full h-screen bg-blue-700">
      <div className="w-full h-full flex flex-col md:flex-row justify-center gap-12 md:gap-0 md:justify-around items-center animate-fade-in">
        
        <div className="flex flex-col justify-center items-center border-2 rounded-2xl border-blue-300 p-4 text-2xl md:text-5xl text-blue-100 transition-transform duration-500 ease-out hover:scale-105">
          <LiaUniversitySolid className="size-22 md:size-32" />
          Universify
        </div>

        <div className="flex flex-col w-11/12 md:w-2/7 bg-amber-50 rounded-md shadow-lg p-6">
          <div className="flex flex-col justify-center items-center gap-4 mb-4">
            <span className="text-4xl text-blue-700">Login</span>
            <div className="text-center text-sm">Digite seus dados de acesso nos campos abaixo</div>
          </div>

          <form onSubmit={handleSubmit(handleLoginData)} className="w-full flex flex-col items-center gap-6">
            <div className="w-5/6">
                <label className="block text-sm mb-1 text-blue-700">E-mail</label>
                <input
                    className="p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o seu e-mail"
                {...register("email")}
                />
            </div>

            <div className="w-5/6">
              <label className="block text-sm mb-1 text-blue-700">Senha</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="py-2.5 ps-4 pe-10 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua senha"
                  {...register("senha")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 end-0 flex items-center px-3 text-gray-500 hover:text-blue-600"
                >
                  <svg
                    className="shrink-0 size-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {showPassword ? (
                      <>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
                <button
                type="submit"
                className="bg-blue-700 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-800 transition"
                >
                Acessar
                </button>
                <u className="text-blue-700 cursor-pointer" onClick={()=> navigate('create-account')}>Ainda não tem uma conta?</u>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
