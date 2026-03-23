"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/contexts/lang-context";

// Conversation 1: Price drop detection (refined)
const CHAT_CONV_1_PT = [
  { from: "atlas", text: "Andre, detectei queda de 12% no preço do SKU AMZN-4521 no concorrente principal.", time: "14:32" },
  { from: "andre", text: "Qual a margem atual?", time: "14:33" },
  { from: "atlas", text: "Margem atual: 31%. Ajustei automaticamente para R$47.90 mantendo margem de 28%. Ainda acima do mínimo configurado (25%).", time: "14:33", type: "audio", duration: "0:12", audioSrc: "/audio/conv1-preco.mp3" },
  { from: "andre", text: "Perfeito. E os ads desse SKU?", time: "14:34" },
  { from: "atlas", text: "Ares já reduziu o bid em 8% para compensar. ACoS projetado: 14.2%. Tudo sob controle. 🎯", time: "14:34" },
];

const CHAT_CONV_1_EN = [
  { from: "atlas", text: "Andre, I detected a 12% price drop on SKU AMZN-4521 from the main competitor.", time: "14:32" },
  { from: "andre", text: "What's the current margin?", time: "14:33" },
  { from: "atlas", text: "Current margin: 31%. I auto-adjusted to R$47.90 keeping margin at 28%. Still above configured minimum (25%).", time: "14:33", type: "audio", duration: "0:12", audioSrc: "/audio/conv1-preco.mp3" },
  { from: "andre", text: "Perfect. What about ads for this SKU?", time: "14:34" },
  { from: "atlas", text: "Ares already reduced the bid by 8% to compensate. Projected ACoS: 14.2%. Everything under control. 🎯", time: "14:34" },
];

// Conversation 2: Stock running low and auto-reorder
const CHAT_CONV_2_PT = [
  { from: "atlas", text: "Andre, estoque do SKU SMART-TV-65 em 8 unidades. Limite mínimo é 15.", time: "09:15" },
  { from: "andre", text: "Já disparou o reabastecimento?", time: "09:16" },
  { from: "atlas", text: "Sim, compra automática autorizada para 200 unidades. ETA: 5 dias úteis.", time: "09:16", type: "audio", duration: "0:11", audioSrc: "/audio/conv2-estoque.mp3" },
  { from: "andre", text: "Bom. Qual o impacto no fluxo de caixa?", time: "09:17" },
  { from: "atlas", text: "Impacto: R$28.000. Isso vai ser recuperado em 3 semanas considerando a velocidade média de venda. Fluxo controlado. 💰", time: "09:17" },
];

const CHAT_CONV_2_EN = [
  { from: "atlas", text: "Andre, stock of SKU SMART-TV-65 is at 8 units. Minimum threshold is 15.", time: "09:15" },
  { from: "andre", text: "Did you trigger the restock?", time: "09:16" },
  { from: "atlas", text: "Yes, authorized automatic purchase for 200 units. ETA: 5 business days.", time: "09:16", type: "audio", duration: "0:11", audioSrc: "/audio/conv2-estoque.mp3" },
  { from: "andre", text: "Good. What's the cash flow impact?", time: "09:17" },
  { from: "atlas", text: "Impact: R$28,000. This will be recovered in 3 weeks based on average sales velocity. Flow controlled. 💰", time: "09:17" },
];

// Conversation 3: Review response and reputation management
const CHAT_CONV_3_PT = [
  { from: "atlas", text: "Alerta: 2 reviews 1-estrela recebidas nas últimas 2 horas. Ambas mencionam demora na entrega.", time: "16:42" },
  { from: "andre", text: "Qual o impacto na nota média?", time: "16:43" },
  { from: "atlas", text: "Nota caiu de 4.7 para 4.65. Disparei respostas automáticas oferecendo compensação. Templates ativadas.", time: "16:44", type: "audio", duration: "0:10", audioSrc: "/audio/conv3-reviews.mp3" },
  { from: "andre", text: "Bora fazer Follow-up pessoal?", time: "16:44" },
  { from: "atlas", text: "Já enviei convites para comentar novamente. Chance de conversão: 35%. Se aceitos, esperamos recuperar para 4.7+ em 2 semanas. ⭐", time: "16:45" },
];

const CHAT_CONV_3_EN = [
  { from: "atlas", text: "Alert: 2 one-star reviews received in the last 2 hours. Both mention shipping delays.", time: "16:42" },
  { from: "andre", text: "What's the impact on overall rating?", time: "16:43" },
  { from: "atlas", text: "Rating dropped from 4.7 to 4.65. I sent automated responses offering compensation. Templates activated.", time: "16:44", type: "audio", duration: "0:10", audioSrc: "/audio/conv3-reviews.mp3" },
  { from: "andre", text: "Should we do personal follow-up?", time: "16:44" },
  { from: "atlas", text: "Already sent invites to re-review. Conversion chance: 35%. If accepted, we should recover to 4.7+ in 2 weeks. ⭐", time: "16:45" },
];

// Conversation 4: Ad campaign ACoS optimization
const CHAT_CONV_4_PT = [
  { from: "atlas", text: "Campanha 'Verão-Eletrônicos' com ACoS em 18.5%. Acima do limite de 16%.", time: "11:20" },
  { from: "andre", text: "Qual SKU está puxando o ACoS para cima?", time: "11:21" },
  { from: "atlas", text: "Fone Bluetooth (30% da campanha). Reduzi o ASIN match negativo e excluí públicos de baixa conversão.", time: "11:22", type: "audio", duration: "0:09", audioSrc: "/audio/conv4-ads.mp3" },
  { from: "andre", text: "Funcionou?", time: "11:22" },
  { from: "atlas", text: "Novo ACoS projetado: 15.2% em 48h. ROAS deve melhorar para 6.8x. Vou continuar monitorando. 📊", time: "11:23" },
];

const CHAT_CONV_4_EN = [
  { from: "atlas", text: "Campaign 'Summer-Electronics' with ACoS at 18.5%. Above 16% target.", time: "11:20" },
  { from: "andre", text: "Which SKU is pulling the ACoS up?", time: "11:21" },
  { from: "atlas", text: "Bluetooth headphones (30% of campaign). I reduced ASIN match negatives and excluded low-converting audiences.", time: "11:22", type: "audio", duration: "0:09", audioSrc: "/audio/conv4-ads.mp3" },
  { from: "andre", text: "Did it work?", time: "11:22" },
  { from: "atlas", text: "Projected ACoS: 15.2% in 48h. ROAS should improve to 6.8x. I'll keep monitoring. 📊", time: "11:23" },
];

// Conversation 5: Listing optimization suggestion
const CHAT_CONV_5_PT = [
  { from: "atlas", text: "Análise concluída: SKU KITCHEN-MIXER-PRO com potencial de otimização de 24% em conversão.", time: "13:50" },
  { from: "andre", text: "O que você sugeriu?", time: "13:51" },
  { from: "atlas", text: "Reordenar bullet points por relevância, adicionar 2 imagens lifestyle, e melhorar a descrição de material/durabilidade.", time: "13:52", type: "audio", duration: "0:12", audioSrc: "/audio/conv5-listing.mp3" },
  { from: "andre", text: "Estimativa de impacto?", time: "13:52" },
  { from: "atlas", text: "Conversão atual: 3.2%. Projeção após mudanças: 3.9-4.1%. Economia potencial de R$1.200/mês em ad spend. Vou preparar os assets. ✨", time: "13:53" },
];

const CHAT_CONV_5_EN = [
  { from: "atlas", text: "Analysis complete: SKU KITCHEN-MIXER-PRO has 24% conversion optimization potential.", time: "13:50" },
  { from: "andre", text: "What did you suggest?", time: "13:51" },
  { from: "atlas", text: "Reorder bullet points by relevance, add 2 lifestyle images, and improve material/durability description.", time: "13:52", type: "audio", duration: "0:12", audioSrc: "/audio/conv5-listing.mp3" },
  { from: "andre", text: "Impact estimate?", time: "13:52" },
  { from: "atlas", text: "Current conversion: 3.2%. Projection after changes: 3.9-4.1%. Potential ad spend savings: R$1,200/month. I'll prepare the assets. ✨", time: "13:53" },
];

// Conversation banks
const CONVERSATION_BANKS_PT = [
  CHAT_CONV_1_PT,
  CHAT_CONV_2_PT,
  CHAT_CONV_3_PT,
  CHAT_CONV_4_PT,
  CHAT_CONV_5_PT,
];

const CONVERSATION_BANKS_EN = [
  CHAT_CONV_1_EN,
  CHAT_CONV_2_EN,
  CHAT_CONV_3_EN,
  CHAT_CONV_4_EN,
  CHAT_CONV_5_EN,
];

// Function to randomly select a conversation
const getRandomConversation = (lang: string) => {
  const banks = lang === "pt" ? CONVERSATION_BANKS_PT : CONVERSATION_BANKS_EN;
  const randomIndex = Math.floor(Math.random() * banks.length);
  return banks[randomIndex];
};

// Audio message component with animated waveform
function AudioMessage({ msg }: { msg: any }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [totalDuration, setTotalDuration] = useState(8000);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (msg.audioSrc) {
      const audio = new Audio(msg.audioSrc);
      audioRef.current = audio;
      audio.addEventListener("loadedmetadata", () => {
        if (audio.duration && isFinite(audio.duration)) {
          setTotalDuration(audio.duration * 1000);
        }
      });
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setElapsed(0);
      });
      return () => { audio.pause(); audio.src = ""; };
    }
  }, [msg.audioSrc]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (audioRef.current) {
        setElapsed(audioRef.current.currentTime * 1000);
      } else {
        setElapsed((prev) => {
          if (prev >= totalDuration) { setIsPlaying(false); return 0; }
          return prev + 50;
        });
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const handlePlayClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
        setElapsed(0);
      }
    } else {
      setIsPlaying(!isPlaying);
      if (!isPlaying) setElapsed(0);
    }
  };

  return (
    <div
      className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
        msg.from === "andre"
          ? "bg-[#005c4b] text-zinc-100 rounded-tr-none"
          : "bg-zinc-800 text-zinc-200 rounded-tl-none"
      }`}
    >
      {msg.from === "atlas" && (
        <p className="text-teal-400 text-[10px] font-semibold mb-2">ATLAS</p>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlayClick}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            msg.from === "andre"
              ? "bg-zinc-700 hover:bg-zinc-600"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {isPlaying ? (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-1 flex-1 h-8">
          {[...Array(20)].map((_, i) => {
            const barProgress = (elapsed / totalDuration) * 20;
            const isActive = i < barProgress;
            return (
              <div
                key={i}
                className={`flex-1 transition-all duration-50 rounded-full ${
                  isActive ? "bg-teal-400 h-5" : "bg-zinc-600 h-3"
                }`}
              />
            );
          })}
        </div>

        <span className="text-[10px] text-zinc-400 flex-shrink-0">{msg.duration}</span>
      </div>

      <div className="flex items-center justify-end gap-1 mt-2">
        <span className="text-[10px] text-zinc-400">{msg.time}</span>
        {msg.from === "andre" && (
          <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        )}
      </div>
    </div>
  );
}

export function WhatsAppButton() {
  const { t, lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  // Initialize conversation when component mounts
  useEffect(() => {
    const selectedConversation = getRandomConversation(lang);
    setMessages(selectedConversation);
  }, [lang]);

  // Show notification dot after 3 seconds
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Animate messages appearing one by one when opened
  useEffect(() => {
    if (!isOpen) return;
    if (visibleMessages >= messages.length) return;

    // First message after 600ms, subsequent messages after random 1500-2500ms
    const delay = visibleMessages === 0 ? 600 : Math.random() * 1000 + 1500;
    const timer = setTimeout(() => {
      setVisibleMessages((v) => v + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isOpen, visibleMessages, messages.length]);

  // Scroll chat to bottom when new messages appear
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  const handleOpen = () => {
    if (!isOpen) {
      // Opening the chat
      setIsOpen(true);
      if (!hasBeenOpened) {
        setHasBeenOpened(true);
        setShowNotification(false);
      }
      setVisibleMessages(0);
      // Select a random conversation when opening
      const selectedConversation = getRandomConversation(lang);
      setMessages(selectedConversation);
    } else {
      // Closing the chat
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 md:right-6 w-[340px] md:w-[380px] bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden z-50 transition-all duration-400 ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        {/* Header */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-yellow-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Ω</span>
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">ATLAS - Orquestrador</p>
            <p className="text-green-200 text-xs">online</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Body */}
        <div
          ref={chatRef}
          className="p-3 space-y-2 overflow-y-auto bg-[#0b141a]"
          style={{
            maxHeight: "50vh",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {/* Date divider */}
          <div className="text-center">
            <span className="text-[10px] text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-md">
              {t("Hoje", "Today")}
            </span>
          </div>

          {messages.slice(0, visibleMessages).map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "andre" ? "justify-end" : "justify-start"} animate-in`}
              style={{
                animation: "slideUp 0.3s ease-out forwards",
              }}
            >
              {msg.type === "audio" ? (
                <AudioMessage msg={msg} />
              ) : (
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                    msg.from === "andre"
                      ? "bg-[#005c4b] text-zinc-100 rounded-tr-none"
                      : "bg-zinc-800 text-zinc-200 rounded-tl-none"
                  }`}
                >
                  {msg.from === "atlas" && (
                    <p className="text-teal-400 text-[10px] font-semibold mb-1">ATLAS</p>
                  )}
                  <p>{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-zinc-400">{msg.time}</span>
                    {msg.from === "andre" && (
                      <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isOpen && visibleMessages < messages.length && visibleMessages > 0 && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 px-4 py-2.5 rounded-lg rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area (decorative) */}
        <div className="bg-[#1b2b33] px-3 py-2 flex items-center gap-2">
          <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2 text-sm text-zinc-500">
            {t("Mensagem", "Message")}
          </div>
          <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-4 md:right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
        style={{
          backgroundColor: "#25D366",
          animation: isOpen ? "none" : "whatsapp-pulse 2s infinite",
        }}
      >
        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className={`w-7 h-7 md:w-8 md:h-8 transition-all duration-300 ${isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Close Icon */}
        <svg
          className={`w-6 h-6 text-white absolute transition-all duration-300 ${isOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>

        {/* Red notification dot */}
        {showNotification && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-zinc-950 animate-bounce">
            3
          </span>
        )}
      </button>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
