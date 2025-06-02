import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../components/Layout";

function Home() {
 const {isThemeDark, setThemeDark} = useContext(ThemeContext);
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-12 px-8 py-16">
      <div className="lg:w-7/12">
        <h1 className={`text-4xl font-extrabold mb-6 ${isThemeDark ? 'text-white' :'text-blue-700'} drop-shadow-lg`}>
          📚 Importância de um Sistema de Cadastro
        </h1>

        <div className={`${isThemeDark ? 'text-gray-300' :'text-blue-700'} space-y-6 text-lg leading-relaxed`}>
          <p>
            Um sistema de cadastro de alunos, docentes, cursos e matrículas é fundamental para o bom funcionamento de qualquer instituição de ensino. Ele centraliza e organiza informações essenciais, permitindo maior controle, agilidade e transparência na gestão acadêmica e administrativa.
          </p>

          <p>
            Com um sistema eficiente, é possível armazenar dados completos dos alunos, como nome, histórico escolar, contato e situação de matrícula, facilitando o acompanhamento da trajetória estudantil. Da mesma forma, os cadastros de docentes permitem registrar informações profissionais, disciplinas ministradas e carga horária, otimizando a alocação de professores e o planejamento das turmas.
          </p>

          <p>
            Além disso, o cadastro de cursos e disciplinas permite uma visão clara da estrutura curricular oferecida, ajudando na organização de horários, pré-requisitos e grade curricular. Já o controle de matrículas garante que cada aluno esteja vinculado corretamente aos cursos e turmas disponíveis, evitando erros manuais e conflitos de dados.
          </p>
        </div>
      </div>

      <div className="lg:w-5/12 flex justify-center">
        <img
          className="rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2thbHo3ODIyYTRqOHkyZW0xOXljZzgxYm05bmlqeDlsNTBpOHhlayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BiOSVU5K9rXR6/giphy.gif"
          alt="Estudante animado"
        />
      </div>
    </section>
  );
}

export default Home;