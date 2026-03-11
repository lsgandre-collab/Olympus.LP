import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Termos de Uso | OLYMPUS",
  description: "Termos de Uso do serviço OLYMPUS",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Nav />
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition">
              <span>←</span>
              <span>Voltar para Home</span>
            </Link>
          </div>

          <article className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-white mb-2">Termos de Uso</h1>
            <p className="text-zinc-400 text-sm mb-8">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Descrição do Serviço</h2>
              <p className="text-zinc-300 mb-4">
                O OLYMPUS é uma plataforma de software como serviço (SaaS) destinada a vendedores da Amazon e plataformas de e-commerce.
                A plataforma oferece um sistema multi-agentes inteligente que automatiza e otimiza operações de vendas, incluindo gerenciamento
                de inventário, análise de dados e estratégias de precificação.
              </p>
              <p className="text-zinc-300 mb-4">
                O serviço é fornecido pela TwelvePrime ("Empresa", "Nós" ou "Nosso") sob demanda via internet, acessível através de interface web
                e APIs integradas. O acesso ao serviço está condicionado à aceitação integral destes Termos de Uso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Elegibilidade e Consentimento</h2>
              <p className="text-zinc-300 mb-4">
                Ao acessar e usar o OLYMPUS, você declara que:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li>É maior de 18 anos de idade</li>
                <li>Possui capacidade jurídica para celebrar contratos vinculantes</li>
                <li>Concorda em cumprir todas as leis e regulamentos aplicáveis</li>
                <li>Não está restrito por sanções comerciais ou listas de indivíduos bloqueados</li>
                <li>Tem autoridade para aceitar estes termos em nome de sua organização</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Obrigações do Usuário</h2>
              <p className="text-zinc-300 mb-4">
                Como usuário do OLYMPUS, você concorda em:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li>Manter a confidencialidade de suas credenciais de acesso e chaves de API</li>
                <li>Não compartilhar sua conta com terceiros não autorizados</li>
                <li>Usar o serviço apenas para fins legais e em conformidade com estes termos</li>
                <li>Notificar imediatamente a TwelvePrime sobre qualquer acesso não autorizado</li>
                <li>Não tentar contornar ou desabilitar medidas de segurança</li>
                <li>Não usar o serviço para spam, phishing, ou atividades maliciosas</li>
                <li>Respeitar os limites de taxa de requisição (rate limits) impostos pela plataforma</li>
                <li>Fornecer informações precisas e atualizadas durante o registro</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Propriedade Intelectual</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Propriedade da Plataforma:</strong> Todo conteúdo, código, design, funcionalidades e documentação do OLYMPUS
                são propriedade exclusiva da TwelvePrime, protegidos por direitos autorais internacionais. Você não adquire direitos de
                propriedade sobre a plataforma, apenas uma licença limitada, revogável e não-exclusiva de uso.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Seus Dados e Conteúdo:</strong> Você retém total propriedade sobre os dados e conteúdo que submete ao OLYMPUS
                (incluindo dados de inventário, informações de vendas e configurações). Você concede à TwelvePrime uma licença
                não-exclusiva, não-transferível, para usar seus dados exclusivamente para fornecer o serviço.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Restrições:</strong> É proibido: (i) reproduzir ou copiar o código da plataforma; (ii) fazer engenharia reversa;
                (iii) criar trabalhos derivados; (iv) tentar extrair ou compilar a plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Limitação de Responsabilidade</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Isenção de Garantias:</strong> O OLYMPUS é fornecido "como está" e "conforme disponível", sem garantias
                de qualquer tipo, expressas ou implícitas, incluindo garantias de comercialização, adequação a um fim específico
                ou não-violação.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Limitação de Danos:</strong> Em nenhuma circunstância a TwelvePrime será responsável por danos indiretos,
                incidentais, especiais, consequenciais ou punitivos, incluindo lucros perdidos ou perda de dados, mesmo que advertida
                sobre a possibilidade de tais danos. A responsabilidade total da TwelvePrime não excederá o valor pago por você
                nos últimos 12 meses de uso do serviço.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Uso de Resultados:</strong> Você reconhece que as recomendações e análises do OLYMPUS são baseadas em algoritmos
                e dados históricos. A TwelvePrime não é responsável por decisões comerciais que você toma com base em tais recomendações.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Disponibilidade do Serviço</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Manutenção:</strong> A TwelvePrime se compromete a manter o OLYMPUS com disponibilidade de pelo menos 99.5% ao mês,
                excluindo interrupções por manutenção programada (avisada com 48 horas de antecedência) e forças maiores.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Suspensão:</strong> Reservamos o direito de suspender ou interromper o serviço a qualquer momento por razões de
                segurança, conformidade legal ou abuso de termos. Notificaremos você conforme exigido por lei, salvo em casos de violação
                manifesta de segurança.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Rescisão da Conta</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Rescisão pelo Usuário:</strong> Você pode rescindir sua conta a qualquer momento através de suas configurações de conta
                ou entrando em contato com nosso suporte. Após rescisão, seus dados serão retidos conforme exigido por lei e política de
                privacidade.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Rescisão pela TwelvePrime:</strong> Podemos rescindir sua conta se: (i) violarmos repetidamente estes termos;
                (ii) você usar o serviço de forma ilegal; (iii) violação de direitos de terceiros; ou (iv) inatividade por 12 meses contínuos.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Efeitos:</strong> Após rescisão, você perderá acesso ao serviço, e a TwelvePrime não será obrigada a reter seus dados
                além dos períodos legalmente exigidos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Conformidade Legal e Integrações</h2>
              <p className="text-zinc-300 mb-4">
                Você é responsável por garantir que seu uso do OLYMPUS, incluindo integrações com a Amazon e outras plataformas,
                comply com os termos de serviço desses fornecedores, leis de proteção de dados e regulamentações comerciais aplicáveis
                em sua jurisdição. A TwelvePrime não é responsável por violações de termos de terceiros causadas pelo seu uso do serviço.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Lei Aplicável e Jurisdição</h2>
              <p className="text-zinc-300 mb-4">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil, sem consideração a seus conflitos de
                disposições legais. Qualquer disputa arising under ou related to estes termos será submetida à jurisdição exclusiva
                dos tribunais competentes do Brasil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. Modificações dos Termos</h2>
              <p className="text-zinc-300 mb-4">
                A TwelvePrime se reserva o direito de modificar estes Termos de Uso a qualquer momento. Notificaremos usuários sobre
                mudanças significativas por e-mail ou aviso na plataforma. Seu uso continuado do OLYMPUS após tais notificações
                constitui sua aceitação dos termos modificados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">11. Contato</h2>
              <p className="text-zinc-300 mb-4">
                Para questões sobre estes Termos de Uso, entre em contato:
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-300">
                <p><strong>TwelvePrime Ltda.</strong></p>
                <p>E-mail: legal@twelveprime.com</p>
              </div>
            </section>

            <section className="mb-12 pt-8 border-t border-zinc-800">
              <p className="text-zinc-400 text-sm">
                Ao acessar o OLYMPUS, você reconhece ter lido, compreendido e concorda em ficar vinculado a estes Termos de Uso.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
