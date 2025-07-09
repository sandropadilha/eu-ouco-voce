import { useState } from "react";
import { Button } from "./components/ui/button"; // Assumindo que este caminho estará na estrutura final
import { Input } from "./components/ui/input";   // Assumindo que este caminho estará na estrutura final
import { Card, CardContent } from "./components/ui/card"; // Assumindo que este caminho estará na estrutura final

export default function App() {
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Tá difícil? Tá pesado? Respira... Eu ouço você." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    if (step === 0) {
      setUserName(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          from: "bot",
          text: `Muito prazer, ${input}! Agora me conta... como você tá se sentindo hoje?`,
        },
      ]);
      setStep(1);
    } else {
      // Lógica para simular resposta do conselheiro
      const resposta = "Entendi... vamos conversar sobre isso.";
      setMessages((prevMessages) => [...prevMessages, { from: "bot", text: resposta }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Eu Ouço Você</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.from === "user"
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              <CardContent className="p-0">{msg.text}</CardContent>
            </Card>
          </div>
        ))}
      </main>
      <footer className="bg-white dark:bg-gray-800 p-4 shadow-t flex items-center space-x-2">
        <Input
          type="text"
          placeholder={step === 0 ? "Digite o nome para o seu conselheiro..." : "Escreva sua mensagem..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <Button onClick={handleSend} className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
          Enviar
        </Button>
      </footer>
    </div>
  );
}
