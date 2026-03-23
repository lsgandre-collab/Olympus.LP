import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Política de Privacidade | OLYMPUS",
  description: "Política de Privacidade do serviço OLYMPUS",
};

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold text-white mb-2">Política de Privacidade</h1>
            <p className="text-zinc-400 text-sm mb-8">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Introdução</h2>
              <p className="text-zinc-300 mb-4">
                {`A TwelvePrime ("Empresa", "Nós") está comprometida com a proteção de sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações pessoais quando você usa o OLYMPUS.`}
              </p>
              <p className="text-zinc-300 mb-4">
                Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e legislação
                internacional aplicável. Leia esta política com atenção. Se você não concordar, por favor, não use o serviço.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Informações que Coletamos</h2>
              <p className="text-zinc-300 mb-4">
                Coletamos vários tipos de informações, incluindo:
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.1 Informações de Registro e Conta</h3>
              <p className="text-zinc-300 mb-4">
                Quando você se registra no OLYMPUS, coletamos: nome completo, endereço de e-mail, número de telefone, empresa/nome comercial,
                localização, informações de pagamento (de forma segura via terceiros) e dados de identificação comercial.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.2 Dados de Atividade e Uso</h3>
              <p className="text-zinc-300 mb-4">
                Rastreamos como você usa o OLYMPUS, incluindo: logs de acesso, recursos utilizados, configurações de conta,
                histórico de consultas e interações com a plataforma. Estes dados nos ajudam a melhorar o serviço.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.3 Dados Comerciais e de Vendas</h3>
              <p className="text-zinc-300 mb-4">
                Você compartilha dados da sua loja da Amazon ou outras plataformas de e-commerce com o OLYMPUS, incluindo:
                informações de produtos, preços, histórico de vendas, dados de clientes (apenas em formato agregado), métricas
                de desempenho e inventário. Estes dados são usados para fornecer análises e recomendações.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.4 Dados de Comunicação</h3>
              <p className="text-zinc-300 mb-4">
                Coletamos conteúdo de comunicações quando você entra em contato conosco via e-mail, chat de suporte ou formulários.
                Incluindo relatórios de problemas, feedbacks e conversas de suporte ao cliente.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.5 Dados Técnicos e de Navegação</h3>
              <p className="text-zinc-300 mb-4">
                Coletamos automaticamente: endereço IP, tipo de navegador, sistema operacional, páginas visitadas, horários de acesso,
                referenciador e dados de cookies para fins de funcionalidade e segurança.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Como Usamos Suas Informações</h2>
              <p className="text-zinc-300 mb-4">
                Utilizamos as informações coletadas para:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li>Fornecer, manter e melhorar o serviço OLYMPUS</li>
                <li>Gerar relatórios, análises e insights personalizados</li>
                <li>Enviar notificações sobre atualizações, promoções e ofertas relevantes</li>
                <li>Processar pagamentos e transações</li>
                <li>Autenticar e gerenciar sua conta</li>
                <li>Responder a solicitações e suporte ao cliente</li>
                <li>Detectar, prevenir e investigar fraudes, abuso e atividades maliciosas</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Conduzir pesquisas, análises e melhorias de produto (dados anônimos)</li>
                <li>Personalizar sua experiência no OLYMPUS</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Armazenamento e Segurança de Dados</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Localização:</strong> Seus dados são armazenados em servidores localizados no Brasil, em conformidade com
                regulamentações de residente de dados. Podemos usar centros de dados de terceiros confiáveis para redundância
                e recuperação de desastres.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Criptografia:</strong> Todos os dados em trânsito são protegidos por criptografia TLS/SSL. Dados sensíveis
                em repouso também são criptografados usando padrões de criptografia robustos (AES-256).
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Medidas de Segurança:</strong> Implementamos firewalls, detecção de intrusão, controle de acesso baseado em
                papéis (RBAC), autenticação multifator, auditorias de segurança regulares e treinamento de segurança para funcionários.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Incidentes:</strong> Em caso de violação de dados, notificaremos usuários afetados conforme exigido por lei,
                dentro de 72 horas de descoberta, com detalhes sobre a violação, dados comprometidos e medidas recomendadas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Compartilhamento de Dados</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Terceiros Confiáveis:</strong> Compartilhamos informações apenas com terceiros necessários para operar o serviço:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li><strong>Resend:</strong> Fornecedor de e-mail para enviar notificações transacionais e boletins (dados limitados: e-mail, nome)</li>
                <li><strong>Provedores de Pagamento:</strong> Processadores de pagamento PCI-DSS compliant para transações</li>
                <li><strong>Amazon Web Services (AWS):</strong> Infraestrutura em nuvem para hospedagem (dados sob contrato de processamento)</li>
                <li><strong>Ferramentas de Analítica:</strong> Plataformas de análise (dados anônimos/agregados apenas)</li>
                <li><strong>Suporte Técnico:</strong> Fornecedores de suporte ao cliente (dados limitados para resolução de problemas)</li>
              </ul>
              <p className="text-zinc-300 mb-4">
                <strong>Requisitos Legais:</strong> Podemos divulgar informações se requerido por lei, ordem judicial, regulador ou
                autoridade governamental. Notificaremos você sobre tais divulgações quando legalmente permitido.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Sem Vendas:</strong> Nunca vendemos seus dados pessoais para marketing de terceiros ou dados brokers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Cookies e Tecnologias de Rastreamento</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Cookies Necessários:</strong> Usamos cookies essenciais para funcionalidade (autenticação, segurança de sessão,
                preferências de idioma). Estes são necessários para o serviço funcionarmagnitude.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Cookies de Desempenho:</strong> Usamos cookies analíticos para entender como usuários interagem com o OLYMPUS,
                ajudando a otimizar performance e experiência do usuário.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Cookies de Marketing:</strong> Você pode controlar cookies de marketing através de suas preferências de navegador.
                A maioria dos navegadores permite rejeitar cookies ou alertar você quando cookies estão sendo definidos.
              </p>
              <p className="text-zinc-300 mb-4">
                <strong>Pixel Tags e Web Beacons:</strong> Usamos tecnologias similares para rastrear conversões e efetividade de campanha
                (dados anônimos apenas).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Retenção de Dados</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Período de Retenção Padrão:</strong> Retemos dados pessoais pelo tempo necessário para fornecer o serviço
                e cumprir obrigações legais, tipicamente:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li>Dados de conta ativa: Durante vigência da conta + 30 dias após rescisão</li>
                <li>Dados de transação/pagamento: 5 anos (conforme exigido por lei fiscal)</li>
                <li>Logs de segurança/auditoria: 1 ano</li>
                <li>Dados de cookies: Máximo 13 meses</li>
                <li>Dados de comunicação: 2 anos (ou conforme obrigação legal)</li>
              </ul>
              <p className="text-zinc-300 mb-4">
                <strong>Após Rescisão:</strong> Após encerramento da conta, seus dados serão anonimizados ou excluídos conforme
                exigido por lei, exceto quando há obrigação legal de retenção.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Seus Direitos de Privacidade</h2>
              <p className="text-zinc-300 mb-4">
                Sob LGPD e legislação equivalente, você tem direitos:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
                <li><strong>Acesso:</strong> Solicitar cópia de seus dados pessoais</li>
                <li><strong>Retificação:</strong> Corrigir dados imprecisos ou incompletos</li>
                <li><strong>Exclusão:</strong> Solicitar exclusão de seus dados (direito ao esquecimento)</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado e transferir para outro controlador</li>
                <li><strong>Oposição:</strong> Opor-se a certos processamentos, incluindo marketing direto</li>
                <li><strong>Limitação:</strong> Solicitar limitação do processamento</li>
                <li><strong>Transparência:</strong> Receber informações sobre coleta e uso de dados</li>
              </ul>
              <p className="text-zinc-300 mb-4">
                Para exercer estes direitos, contate: legal@twelveprime.com com {`"Solicitação de Privacidade"`} no assunto.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Transferências Internacionais</h2>
              <p className="text-zinc-300 mb-4">
                Embora mantenhamos dados principalmente no Brasil, para fins de recuperação de desastres, podemos transferir dados
                para servidores em outras jurisdições sob contrato de processamento de dados que assegure proteção equivalente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. Menores de Idade</h2>
              <p className="text-zinc-300 mb-4">
                O OLYMPUS não é destinado a menores de 18 anos. Não coletamos dados de menores intencionalmente. Se descobrirmos
                que coletamos dados de menor, notificaremos pais/guardiões e excluiremos tais dados imediatamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">11. Links Externos</h2>
              <p className="text-zinc-300 mb-4">
                O OLYMPUS pode conter links para sites de terceiros. Esta Política de Privacidade aplica-se apenas ao serviço OLYMPUS.
                Não somos responsáveis pelas práticas de privacidade de sites externos. Recomendamos revisar suas políticas de privacidade.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">12. Atualizações desta Política</h2>
              <p className="text-zinc-300 mb-4">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas por
                e-mail ou aviso destacado na plataforma. Seu uso continuado do OLYMPUS após tais notificações constitui sua aceitação
                das mudanças.
              </p>
            </section>

            <section className="mb-12 pt-8 border-t border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">13. Contato</h2>
              <p className="text-zinc-300 mb-4">
                Para questões sobre esta Política de Privacidade ou práticas de privacidade:
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-300">
                <p><strong>TwelvePrime Ltda.</strong></p>
                <p>E-mail: legal@twelveprime.com</p>
                <p>Para solicitações de privacidade LGPD: lgpd@twelveprime.com</p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
