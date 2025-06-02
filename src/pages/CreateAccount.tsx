import { LiaUniversitySolid } from "react-icons/lia";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const CreateAccount = () => {
  const navigate = useNavigate();
  const userCreateSchema = z.object({
    nome: z.string(),
    email: z.string(),
    password: z.string().min(6),
    cpf: z.string().max(11),
    perfil: z.number()
 })
 
  const { register, handleSubmit } = useForm<UserCreateSchema>({
    resolver: zodResolver(userCreateSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  type UserCreateSchema = z.infer<typeof userCreateSchema>;

  const handleLoginData = (data: UserCreateSchema) => {
    console.log(data);
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
            <span className="text-4xl text-blue-700">Criar Conta</span>
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
                  className="p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua senha (mínimo 6 caracteres)"
                  {...register("password")}
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
            <div className="w-5/6">
                <label className="block text-sm mb-1 text-blue-700">CPF</label>
                <input
                    className="p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o seu CPF"
                {...register("cpf")}
                />
            </div>
            <div className=" w-5/6 flex flex-col justify-start">
                <label className="block text-sm mb-1 text-blue-700">Perfil</label>
                <select defaultValue={0} className="select w-full">
                    <option value={0} key={0}>Selecione uma opção</option>
                    <option value={1} key={1}>Aluno</option>
                    <option value={1} key={1}>Professor</option>
                </select>
            </div>
            <div className="flex justify-between w-5/6 gap-2">
                <button  className="bg-blue-700 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-800 transition" onClick={()=> navigate(-1)}><IoArrowBack /></button>
                <button
                type="submit"
                className="bg-blue-700 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-800 transition"
                >
                Criar Conta
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
