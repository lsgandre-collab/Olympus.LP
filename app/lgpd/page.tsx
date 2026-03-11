import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "LGPD - Compliance | OLYMPUS",
  description: "Informações sobre LGPD e direitos de proteção de dados",
};

export default function LGPDPage() {
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
            <h1 className="text-4xl font-bold text-white mb-2">Conformidade LGPD</h1>
            <p className="text-zinc-400 text-sm mb-8">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Sobre a LGPD</h2>
              <p className="text-zinc-300 mb-4">
                A Lei Geral de Proteção de Dados (LGPD), instituída pela Lei nº 13.709/2018 e regulamentada pelo Decreto nº 10.474/2020,
                é a legislação brasileira que rege a proteção de dados pessoais de pessoas naturais. O OLYMPUS, operado pela TwelvePrime,
                está totalmente em conformidade com a LGPD.
              </p>
              <p className="text-zinc-300 mb-4">
                Esta página fornece informações específicas sobre seus direitos sob a LGPD e como exercê-los.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Informações do Controlador de Dados</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Controlador de Dados (Data Controller):</strong>
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-300 mb-4">
                <p><strong>TwelvePrime Ltda.</strong></p>
                <p>Pessoa Jurídica: Empresa de Tecnologia</p>
                <p>E-mail: legal@twelveprime.com</p>
                <p>E-mail de Conformidade LGPD: lgpd@twelveprime.com</p>
                <p>Telefone: Disponível mediante solicitação</p>
              </div>
              <p className="text-zinc-300 mb-4">
                Como controlador, a TwelvePrime é responsável por determinar os fins e meios de processamento de seus dados pessoais.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Encarregado de Proteção de Dados (DPO)</h2>
              <p className="text-zinc-300 mb-4">
                A TwelvePrime designou um Encarregado de Proteção de Dados (Data Protection Officer - DPO) responsável por supervisionar
                a conformidade com a LGPD.
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-300 mb-4">
                <p><strong>Encarregado de Proteção de Dados</strong></p>
                <p>E-mail: dpo@twelveprime.com</p>
                <p>Disponível: Segunda a Sexta, 9h-18h (Horário de Brasília)</p>
              </div>
              <p className="text-zinc-300 mb-4">
                Você pode contatar o DPO com questões sobre processamento de dados, direitos de privacidade ou para denunciar
                possíveis violações da LGPD.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Direitos dos Titulares de Dados</h2>
              <p className="text-zinc-300 mb-4">
                Sob a LGPD, você, como titular de dados, tem os seguintes direitos:
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.1 Direito de Acesso (Artigo 18)</h3>
              <p className="text-zinc-300 mb-4">
                Você tem o direito de solicitar e obter confirmação de quais dados pessoais a TwelvePrime possui sobre você,
                bem como uma cópia desses dados em formato estruturado e compreensível. Responderemos em até 15 dias úteis.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.2 Direito de Retificação (Artigo 19)</h3>
              <p className="text-zinc-300 mb-4">
                Você pode solicitar a correção de dados pessoais imprecisos, incompletos ou desatualizados. Processaremos
                correções conforme solicitado e notificaremos terceiros que receberam seus dados quando apropriado.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.3 Direito à Exclusão (Artigo 17 - Direito ao Esquecimento)</h3>
              <p className="text-zinc-300 mb-4">
                Você pode solicitar a exclusão de seus dados pessoais, salvo quando há obrigação legal de retenção (como em
                registros fiscais por 5 anos). Após exclusão, seus dados não serão mais usados para qualquer finalidade.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.4 Direito à Portabilidade (Artigo 20)</h3>
              <p className="text-zinc-300 mb-4">
                Você tem o direito de receber seus dados pessoais em formato estruturado, comumente utilizado e legível por máquina
                (como CSV ou JSON), e de transferir esses dados para outro controlador sem impedimentos.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.5 Direito de Oposição (Artigo 21)</h3>
              <p className="text-zinc-300 mb-4">
                Você pode se opor ao processamento de seus dados quando:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li>O processamento não é necessário para cumprir uma obrigação legal</li>
                <li>Você se opõe a receber marketing direto ou comunicações comerciais</li>
                <li>O processamento se baseia em interesse legítimo e você não deseja ser processado</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.6 Direito à Limitação (Artigo 22)</h3>
              <p className="text-zinc-300 mb-4">
                Você pode solicitar que limitemos o processamento de seus dados quando:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li>A precisão dos dados está em disputa</li>
                <li>O processamento é ilegal, mas você prefere limitação em vez de exclusão</li>
                <li>Você se opõe ao processamento e aguarda nossa resposta</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.7 Direito de Informação (Artigo 9)</h3>
              <p className="text-zinc-300 mb-4">
                Você tem o direito de ser informado sobre coleta, uso, armazenamento e compartilhamento de seus dados pessoais.
                Esta informação é fornecida através desta Política de Privacidade e Conformidade LGPD.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.8 Direito de Não Ser Discriminado</h3>
              <p className="text-zinc-300 mb-4">
                Você não será discriminado por exercer qualquer de seus direitos de privacidade sob a LGPD. Continuará tendo
                acesso aos mesmos serviços e preços, independentemente de exercer seus direitos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Bases Legais para Processamento</h2>
              <p className="text-zinc-300 mb-4">
                Processamos seus dados pessoais com base nas seguintes bases legais definidas no Artigo 7 da LGPD:
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.1 Consentimento (Artigo 7, I)</h3>
              <p className="text-zinc-300 mb-4">
                Dados de marketing, comunicações comerciais e analytics avançado são processados com seu consentimento explícito.
                Você pode revogar este consentimento a qualquer momento através de suas preferências de conta.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.2 Execução de Contrato (Artigo 7, II)</h3>
              <p className="text-zinc-300 mb-4">
                Processamos dados necessários para celebrar e executar o contrato de serviço OLYMPUS, incluindo dados de registro,
                pagamento, e operação da plataforma.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.3 Obrigação Legal (Artigo 7, III)</h3>
              <p className="text-zinc-300 mb-4">
                Processamos dados para cumprir obrigações legais, incluindo conformidade fiscal, anti-fraude, investigação de
                infrações criminais e outras obrigações regulatórias.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.4 Interesse Legítimo (Artigo 7, IX)</h3>
              <p className="text-zinc-300 mb-4">
                Processamos dados para fins de: melhoria de segurança, prevenção de fraudes, pesquisa e desenvolvimento,
                conformidade de termos de serviço e operação eficiente da plataforma, quando não prevalece seu interesse
                em não ser processado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Categorias de Dados Processadas</h2>
              <p className="text-zinc-300 mb-4">
                Processamos as seguintes categorias de dados pessoais:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li><strong>Dados de Identificação:</strong> Nome, e-mail, telefone, endereço</li>
                <li><strong>Dados de Autenticação:</strong> Senha (criptografada), tokens de sessão</li>
                <li><strong>Dados Financeiros:</strong> Informações de pagamento (processadas por terceiros PCI-compliant)</li>
                <li><strong>Dados de Negócio:</strong> Informações comerciais, métricas de vendas, dados de inventário</li>
                <li><strong>Dados de Atividade:</strong> Logs de acesso, histórico de navegação, interações com a plataforma</li>
                <li><strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador, dados de cookies</li>
                <li><strong>Dados de Comunicação:</strong> Conteúdo de e-mails, chat de suporte, formulários</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Períodos de Retenção de Dados</h2>
              <p className="text-zinc-300 mb-4">
                Seguimos o princípio de retenção mínima: retemos dados apenas pelo período necessário:
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-300 space-y-3 mb-4">
                <div>
                  <p><strong>Dados de Conta Ativa:</strong> Durante atividade da conta + 30 dias após rescisão</p>
                </div>
                <div>
                  <p><strong>Dados de Transação/Pagamento:</strong> 5 anos (obrigação fiscal brasileira)</p>
                </div>
                <div>
                  <p><strong>Logs de Auditoria/Segurança:</strong> 1 ano</p>
                </div>
                <div>
                  <p><strong>Dados de Cookies:</strong> Máximo 13 meses (exceto cookies essenciais)</p>
                </div>
                <div>
                  <p><strong>Dados de Comunicação (suporte):</strong> 2 anos</p>
                </div>
                <div>
                  <p><strong>Dados de Consentimento (marketing):</strong> Até revogação do consentimento</p>
                </div>
              </div>
              <p className="text-zinc-300 mb-4">
                Após expiration dos períodos, dados são seguramente anonimizados ou excluídos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Como Exercer Seus Direitos LGPD</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Para solicitar acesso, retificação, exclusão ou portabilidade de dados:</strong>
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-300 mb-4">
                <p><strong>1. Via E-mail:</strong></p>
                <p className="ml-4">Envie uma solicitação formal para: <strong>lgpd@twelveprime.com</strong></p>
                <p className="mt-2"><strong>2. Incluir na Solicitação:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Tipo de direito que deseja exercer (acesso, retificação, etc.)</li>
                  <li>Seu nome completo e e-mail cadastrado</li>
                  <li>Descrição clara do que está solicitando</li>
                  <li>Cópia de documento de identificação (RG, CPF ou passaporte)</li>
                </ul>
                <p className="mt-4"><strong>3. Prazo de Resposta:</strong></p>
                <p className="ml-4">Responderemos em até 15 dias úteis. Se complexo, até 30 dias.</p>
                <p className="mt-2"><strong>4. Confirmação de Identidade:</strong></p>
                <p className="ml-4">Podemos solicitar informações adicionais para confirmar sua identidade antes de processar.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Processadores de Dados</h2>
              <p className="text-zinc-300 mb-4">
                {`A TwelvePrime contrata fornecedores terceiros ("Processadores") que processam dados sob nossa instrução:`}
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-300 space-y-3 mb-4">
                <div>
                  <p><strong>Amazon Web Services (AWS)</strong> - Hospedagem em nuvem (Brasil)</p>
                </div>
                <div>
                  <p><strong>Resend</strong> - Envio de e-mails transacionais</p>
                </div>
                <div>
                  <p><strong>Stripe / PagSeguro</strong> - Processamento de pagamentos</p>
                </div>
                <div>
                  <p><strong>Google Analytics</strong> - Análise de uso (dados anônimos)</p>
                </div>
              </div>
              <p className="text-zinc-300 mb-4">
                Todos os processadores estão vinculados por contratos de Processamento de Dados que incluem cláusulas de proteção
                de dados consistentes com a LGPD.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. Segurança de Dados</h2>
              <p className="text-zinc-300 mb-4">
                A TwelvePrime implementa medidas técnicas e administrativas para proteger seus dados:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li>Criptografia end-to-end (TLS/SSL) para dados em trânsito</li>
                <li>Criptografia AES-256 para dados em repouso</li>
                <li>Autenticação multifator (MFA) para contas de usuário</li>
                <li>Controle de acesso baseado em papéis (RBAC) para funcionários</li>
                <li>Firewalls e detecção de intrusão</li>
                <li>Backup e planos de recuperação de desastres</li>
                <li>Auditorias de segurança regulares</li>
                <li>Treinamento de segurança de dados para funcionários</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">11. Notificação de Violação de Dados</h2>
              <p className="text-zinc-300 mb-4">
                Em caso de violação de dados pessoais que coloque em risco direitos e liberdades:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li>Notificaremos você <strong>no prazo máximo de 72 horas</strong> após descoberta</li>
                <li>Notificaremos a Autoridade Nacional de Proteção de Dados (ANPD) se necessário</li>
                <li>A notificação incluirá: descrição da violação, dados afetados, possíveis consequências e medidas recomendadas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">12. Avaliação de Impacto (DPIA)</h2>
              <p className="text-zinc-300 mb-4">
                Para processamento de alto risco, a TwelvePrime conduz uma Avaliação de Impacto à Privacidade (Data Protection Impact Assessment).
                Se você está em processamento de risco elevado, podemos solicitar sua participação.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">13. Reclamação à Autoridade Reguladora</h2>
              <p className="text-zinc-300 mb-4">
                Se você acredita que a TwelvePrime viola seus direitos LGPD, pode apresentar uma reclamação à:
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-300">
                <p><strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong></p>
                <p>Website: <span className="text-red-400">www.gov.br/cidadania/pt-br/acesso-a-informacao/anpd</span></p>
                <p>E-mail: indico@anpd.gov.br</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">14. Perguntas Frequentes</h2>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">P: Quanto tempo leva para responder uma solicitação LGPD?</h3>
              <p className="text-zinc-300 mb-4">
                R: Responderemos em até 15 dias úteis. Solicitações complexas podem estender até 30 dias.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">P: Há custo para exercer meus direitos?</h3>
              <p className="text-zinc-300 mb-4">
                R: Não. Exercer seus direitos é gratuito, exceto se a solicitação é manifestamente infundada ou excessiva.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">P: Posso revogar meu consentimento?</h3>
              <p className="text-zinc-300 mb-4">
                R: Sim, pode revogar consentimento a qualquer momento através de suas preferências de conta ou enviando e-mail
                para lgpd@twelveprime.com. Revogação não afeta legalidade do processamento anterior.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">P: Meus dados são vendidos?</h3>
              <p className="text-zinc-300 mb-4">
                R: Não. Nunca vendemos dados pessoais para marketing ou data brokers. Dados são compartilhados apenas com
                processadores necessários para fornecer o serviço.
              </p>
            </section>

            <section className="mb-12 pt-8 border-t border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">15. Contato</h2>
              <p className="text-zinc-300 mb-4">
                Para questões sobre conformidade LGPD:
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-300">
                <p><strong>Encarregado de Proteção de Dados (DPO)</strong></p>
                <p>E-mail: dpo@twelveprime.com</p>
                <p className="mt-2"><strong>Solicitações LGPD Gerais</strong></p>
                <p>E-mail: lgpd@twelveprime.com</p>
                <p className="mt-2"><strong>Questões Legais</strong></p>
                <p>E-mail: legal@twelveprime.com</p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
