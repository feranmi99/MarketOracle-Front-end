"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimeframeTile from "@/components/TimeframeTile";
import TradeSetupCard from "@/components/TradeSetupCard";
import DecisionCard from "@/components/DecisionCard";
import AnalyzeForm from "@/components/AnalyzeForm";
import AppShell from "@/components/AppShell";
import { analyzeTrade } from "@/lib/api";
import PairSelector from "@/components/PairSelector";

const CRYPTO_PAIRS = ['0GUSDT', '1000000BABYDOGEUSDT', '1000000CHEEMSUSDT', '1000000MOGUSDT', '10000ELONUSDT', '10000QUBICUSDT', '10000SATSUSDT', '1000BONKPERP', '1000BONKUSDT', '1000BTTUSDT', '1000CATUSDT', '1000FLOKIUSDT', '1000LUNCUSDT', '1000NEIROCTOPERP', '1000NEIROCTOUSDT', '1000PEPEPERP', '1000PEPEUSDT', '1000RATSUSDT', '1000TAGUSDT', '1000TOSHIUSDT', '1000TURBOUSDT', '1000XECUSDT', '1000XUSDT', '1INCHUSDT', '2ZUSDT', '4USDT', 'A2ZUSDT', 'AAVEPERP', 'AAVEUSDT', 'ACEUSDT', 'ACHUSDT', 'ACTUSDT', 'ACXUSDT', 'ADAUSDT', 'AERGOUSDT', 'AEROUSDT', 'AEVOPERP', 'AEVOUSDT', 'AGIUSDT', 'AGLDUSDT', 'AIAUSDT', 'AINUSDT', 'AIOUSDT', 'AIOZUSDT', 'AIXBTUSDT', 'AKEUSDT', 'AKTUSDT', 'ALCHUSDT', 'ALEOUSDT', 'ALGOUSDT', 'ALICEUSDT', 'ALLOUSDT', 'ALPINEUSDT', 'ALTUSDT', 'ALUUSDT', 'ANIMEUSDT', 'ANKRUSDT', 'APEUSDT', 'APEXUSDT', 'API3USDT', 'APRUSDT', 'APTUSDT', 'ARBPERP', 'ARBUSDT', 'ARCUSDT', 'ARIAUSDT', 'ARKMUSDT', 'ARKUSDT', 'ARPAUSDT', 'ARUSDT', 'ASPUSDT', 'ASRUSDT', 'ASTERUSDT', 'ASTRUSDT', 'ATHUSDT', 'ATOMUSDT', 'ATUSDT', 'AUCTIONUSDT', 'AUSDT', 'AVAAIUSDT', 'AVAUSDT', 'AVAXUSDT', 'AVLUSDT', 'AVNTUSDT', 'AWEUSDT', 'AXLUSDT', 'AXSUSDT', 'B2USDT', 'B3USDT', 'BABYUSDT', 'BANANAS31USDT', 'BANANAUSDT', 'BANDUSDT', 'BANKUSDT', 'BANUSDT', 'BARDUSDT', 'BATUSDT', 'BBUSDT', 'BCHPERP', 'BCHUSDT', 'BEAMUSDT', 'BEATUSDT', 'BELUSDT', 'BERAUSDT', 'BICOUSDT', 'BIGTIMEUSDT', 'BIOUSDT', 'BLASTUSDT', 'BLESSUSDT', 'BLUAIUSDT', 'BLURUSDT', 'BMTUSDT', 'BNBPERP', 'BNBUSDT', 'BNTUSDT', 'BOBAUSDT', 'BOBBOBUSDT', 'BOMEUSDT', 'BRETTUSDT', 'BROCCOLIUSDT', 'BRUSDT', 'BSUUSDT', 'BSVUSDT', 'BTC-26DEC25', 'BTCPERP', 'BTCUSDT', 'BTCUSDT-05DEC25', 'BTCUSDT-12DEC25', 'BTCUSDT-25SEP26', 'BTCUSDT-26DEC25', 'BTCUSDT-26JUN26', 'BTCUSDT-27MAR26', 'BTCUSDT-28NOV25', 'BTCUSDT-30JAN26', 'BTRUSDT', 'BUSDT', 'C98USDT', 'CAKEUSDT', 'CAMPUSDT', 'CARVUSDT', 'CATIUSDT', 'CCUSDT', 'CELOUSDT', 'CETUSUSDT', 'CFXUSDT', 'CGPTUSDT', 'CHILLGUYUSDT', 'CHRUSDT', 'CHZUSDT', 'CKBUSDT', 'CLANKERUSDT', 'CLOUDUSDT', 'CLOUSDT', 'COAIUSDT', 'COMMONUSDT', 'COMPUSDT', 'COOKIEUSDT', 'COOKUSDT', 'COREUSDT', 'COTIUSDT', 'COWUSDT', 'CROSSUSDT', 'CROUSDT', 'CRVPERP', 'CRVUSDT', 'CTCUSDT', 'CTKUSDT', 'CTSIUSDT', 'CUDISUSDT', 'CUSDT', 'CVCUSDT', 'CVXUSDT', 'CYBERUSDT', 'DAMUSDT', 'DASHUSDT', 'DBRUSDT', 'DEEPUSDT', 'DEGENUSDT', 'DENTUSDT', 'DEXEUSDT', 'DGBUSDT', 'DIAUSDT', 'DODOUSDT', 'DOGEPERP', 'DOGEUSDT', 'DOGEUSDT-05DEC25', 'DOGEUSDT-12DEC25', 'DOGEUSDT-26DEC25', 'DOGEUSDT-28NOV25', 'DOGUSDT', 'DOLOUSDT', 'DOODUSDT', 'DOTPERP', 'DOTUSDT', 'DRIFTUSDT', 'DUSKUSDT', 'DYDXUSDT', 'DYMUSDT', 'EDENUSDT', 'EDUUSDT', 'EGLDUSDT', 'EIGENUSDT', 'ELXUSDT', 'ENAPERP', 'ENAUSDT', 'ENJUSDT', 'ENSOUSDT', 'ENSUSDT', 'EPICUSDT', 'EPTUSDT', 'ERAUSDT', 'ESPORTSUSDT', 'ESUSDT', 'ETCPERP', 'ETCUSDT', 'ETH-26DEC25', 'ETHBTCUSDT', 'ETHFIPERP', 'ETHFIUSDT', 'ETHPERP', 'ETHUSDT', 'ETHUSDT-05DEC25', 'ETHUSDT-12DEC25', 'ETHUSDT-25SEP26', 'ETHUSDT-26DEC25', 'ETHUSDT-26JUN26', 'ETHUSDT-27MAR26', 'ETHUSDT-28NOV25', 'ETHUSDT-30JAN26', 'EULUSDT', 'EVAAUSDT', 'FARTCOINPERP', 'FARTCOINUSDT', 'FFUSDT', 'FIDAUSDT', 'FILUSDT', 'FIOUSDT', 'FLOCKUSDT', 'FLOWUSDT', 'FLRUSDT', 'FLUIDUSDT', 'FLUXUSDT', 'FORMUSDT', 'FUSDT', 'FWOGUSDT', 'FXSUSDT', 'GALAUSDT', 'GASUSDT', 'GIGAUSDT', 'GIGGLEUSDT', 'GLMUSDT', 'GMTUSDT', 'GMXUSDT', 'GNOUSDT', 'GOATUSDT', 'GODSUSDT', 'GPSUSDT', 'GRASSUSDT', 'GRIFFAINUSDT', 'GRTUSDT', 'GUNUSDT', 'HAEDALUSDT', 'HANAUSDT', 'HBARPERP', 'HBARUSDT', 'HEIUSDT', 'HEMIUSDT', 'HFTUSDT', 'HIGHUSDT', 'HIPPOUSDT', 'HIVEUSDT', 'HMSTRUSDT', 'HNTUSDT', 'HOLOUSDT', 'HOMEUSDT', 'HOOKUSDT', 'HPERP', 'HPOS10IUSDT', 'HUMAUSDT', 'HUSDT', 'HYPEPERP', 'HYPERUSDT', 'HYPEUSDT', 'ICNTPERP', 'ICNTUSDT', 'ICPUSDT', 'ICXUSDT', 'IDEXUSDT', 'IDUSDT', 'ILVUSDT', 'IMXUSDT', 'INITUSDT', 'INJPERP', 'INJUSDT', 'INUSDT', 'IOSTUSDT', 'IOTAUSDT', 'IOTXUSDT', 'IOUSDT', 'IPPERP', 'IPUSDT', 'IRYSUSDT', 'JASMYUSDT', 'JCTUSDT', 'JELLYJELLYUSDT', 'JSTUSDT', 'JTOUSDT', 'JUPUSDT', 'KAIAUSDT', 'KAITOUSDT', 'KASUSDT', 'KAVAUSDT', 'KERNELUSDT', 'KGENUSDT', 'KITEUSDT', 'KMNOUSDT', 'KNCUSDT', 'KSMUSDT', 'L3USDT', 'LABUSDT', 'LAUSDT', 'LDOUSDT', 'LIGHTUSDT', 'LINEAUSDT', 'LINKPERP', 'LINKUSDT', 'LISTAUSDT', 'LPTUSDT', 'LQTYUSDT', 'LRCUSDT', 'LSKUSDT', 'LTCPERP', 'LTCUSDT', 'LUMIAUSDT', 'LUNA2USDT', 'LYNUSDT', 'MAGICUSDT', 'MANAUSDT', 'MANTAUSDT', 'MASKUSDT', 'MAVIAUSDT', 'MAVUSDT', 'MBOXUSDT', 'MELANIAUSDT', 'MEMEUSDT', 'MERLUSDT', 'METISUSDT', 'METUSDT', 'MEUSDT', 'MEWUSDT', 'MILKUSDT', 'MINAUSDT', 'MIRAUSDT', 'MITOUSDT', 'MLNUSDT', 'MMTUSDT', 'MNTPERP', 'MNTUSDT', 'MNTUSDT-05DEC25', 'MNTUSDT-12DEC25', 'MNTUSDT-26DEC25', 'MNTUSDT-28NOV25', 'MOCAUSDT', 'MONUSDT', 'MOODENGPERP', 'MOODENGUSDT', 'MORPHOUSDT', 'MOVEUSDT', 'MOVRUSDT', 'MTLUSDT', 'MUBARAKUSDT', 'MUSDT', 'MYROUSDT', 'MYXUSDT', 'NAORISUSDT', 'NEARUSDT', 'NEOUSDT', 'NEWTUSDT', 'NFPUSDT', 'NILUSDT', 'NKNUSDT', 'NMRUSDT', 'NOMUSDT', 'NOTPERP', 'NOTUSDT', 'NSUSDT', 'NTRNUSDT', 'NXPCUSDT', 'OBOLUSDT', 'OBTUSDT', 'OGNUSDT', 'OGUSDT', 'OKBUSDT', 'OLUSDT', 'OMUSDT', 'ONDOPERP', 'ONDOUSDT', 'ONEUSDT', 'ONGUSDT', 'ONTUSDT', 'OPENUSDT', 'OPPERP', 'OPUSDT', 'ORBSUSDT', 'ORCAUSDT', 'ORDERUSDT', 'ORDIPERP', 'ORDIUSDT', 'OXTUSDT', 'PARTIUSDT', 'PAXGUSDT', 'PEAQUSDT', 'PENDLEPERP', 'PENDLEUSDT', 'PENGUPERP', 'PENGUUSDT', 'PEOPLEUSDT', 'PHAUSDT', 'PHBUSDT', 'PIEVERSEUSDT', 'PIGGYUSDT', 'PIPPINUSDT', 'PIXELUSDT', 'PLUMEUSDT', 'PNUTPERP', 'PNUTUSDT', 'POLPERP', 'POLUSDT', 'POLYXUSDT', 'PONKEUSDT', 'POPCATPERP', 'POPCATUSDT', 'PORTALUSDT', 'POWRUSDT', 'PRCLUSDT', 'PROMPTUSDT', 'PROMUSDT', 'PROVEUSDT', 'PTBUSDT', 'PUFFERUSDT', 'PUMPBTCUSDT', 'PUMPFUNPERP', 'PUMPFUNUSDT', 'PUNDIXUSDT', 'PYRUSDT', 'PYTHUSDT', 'QNTUSDT', 'QTUMUSDT', 'QUICKUSDT', 'QUSDT', 'RAREUSDT', 'RAYDIUMUSDT', 'RDNTUSDT', 'RECALLUSDT', 'REDUSDT', 'RENDERUSDT', 'REQUSDT', 'RESOLVPERP', 'RESOLVUSDT', 'REZUSDT', 'RIFUSDT', 'RIVERUSDT', 'RLCUSDT', 'RLUSDUSDT', 'ROAMUSDT', 'RONINUSDT', 'ROSEUSDT', 'RPLUSDT', 'RSRUSDT', 'RUNEUSDT', 'RVNUSDT', 'SAFEUSDT', 'SAGAUSDT', 'SAHARAPERP', 'SAHARAUSDT', 'SANDUSDT', 'SAPIENUSDT', 'SAROSUSDT', 'SCRTUSDT', 'SCRUSDT', 'SCUSDT', 'SDUSDT', 'SEIPERP', 'SEIUSDT', 'SFPUSDT', 'SHELLUSDT', 'SHIB1000PERP', 'SHIB1000USDT', 'SIGNUSDT', 'SIRENUSDT', 'SKLUSDT', 'SKYAIUSDT', 'SKYUSDT', 'SLPUSDT', 'SNTUSDT', 'SNXUSDT', 'SOLAYERUSDT', 'SOLPERP', 'SOLUSDT', 'SOLUSDT-05DEC25'];

export default function HolyGrailUI() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');

  async function handleAnalyze(pair: string) {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await analyzeTrade({ pair });
      setAnalysis(res);
      setSelectedPair(pair);
    } catch (e: any) {
      setError(e?.detail || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Alpha Trade Bot
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced multi-timeframe technical analysis with AI-powered trading insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            {/* Left Column - Pair Selector and Form */}
            <div className="xl:col-span-1">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-8 space-y-6"
              >
                {/* Pair Selector Component */}
                <PairSelector
                  pairs={CRYPTO_PAIRS}
                  selectedPair={selectedPair}
                  onPairChange={setSelectedPair}
                />

                {/* Analysis Form */}
                <div className="bg-white rounded-lg border border-slate-200/80 shadow-xl p-6 backdrop-blur-sm">
                  <AnalyzeForm
                    onAnalyze={handleAnalyze}
                    loading={loading}
                    cryptoPairs={CRYPTO_PAIRS}
                    selectedPair={selectedPair}
                    onPairChange={setSelectedPair}
                  />
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">!</span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Analysis Results */}
            <div className="xl:col-span-3">
              <AnimatePresence mode="wait">
                {analysis && (
                  <motion.div
                    key="analysis-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Main Decision and Trade Setup */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <DecisionCard
                        decision={analysis.final_decision}
                        confidence={Math.max(analysis.holy_grail_confidence, analysis.advanced_confidence)}
                        holyGrailConfidence={analysis.holy_grail_confidence}
                        advancedConfidence={analysis.advanced_confidence}
                        confirmationStatus={analysis.confirmation_status}
                      />
                      <TradeSetupCard
                        tradeSetup={analysis.trade_setup}
                        tradeRecommendation={analysis.trade_recommendation}
                      />
                    </div>

                    {/* Strategy Confirmation */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-lg border border-slate-200/80 shadow-xl p-6"
                    >
                      <h3 className="text-2xl font-bold text-slate-800 mb-4">Strategy Confirmation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <span className="font-semibold text-slate-700">Holy Grail</span>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${analysis.holy_grail_decision === 'LONG' ? 'text-green-600' : analysis.holy_grail_decision === 'SHORT' ? 'text-red-600' : 'text-amber-600'}`}>
                                {analysis.holy_grail_decision}
                              </div>
                              <div className="text-sm text-slate-600">{analysis.holy_grail_confidence}% confidence</div>
                            </div>
                          </div>
                          <div className="text-sm text-slate-600 p-3 bg-blue-50 rounded-lg">
                            {analysis.holy_grail_reason}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <span className="font-semibold text-slate-700">Advanced Analysis</span>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${analysis.advanced_decision === 'LONG' ? 'text-green-600' : analysis.advanced_decision === 'SHORT' ? 'text-red-600' : 'text-amber-600'}`}>
                                {analysis.advanced_decision}
                              </div>
                              <div className="text-sm text-slate-600">{analysis.advanced_confidence}% confidence</div>
                            </div>
                          </div>
                          <div className="text-sm text-slate-600 p-3 bg-purple-50 rounded-lg">
                            {analysis.advanced_reason}
                          </div>
                        </div>
                      </div>
                      <div className={`mt-4 p-4 rounded-xl border-2 ${analysis.confirmation_status === 'confirmed'
                          ? 'bg-green-50 border-green-200'
                          : analysis.confirmation_status === 'conflict'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-amber-50 border-amber-200'
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${analysis.confirmation_status === 'confirmed' ? 'bg-green-500' :
                              analysis.confirmation_status === 'conflict' ? 'bg-red-500' : 'bg-amber-500'
                            }`} />
                          <div>
                            <div className="font-semibold text-slate-800 capitalize">{analysis.confirmation_status}</div>
                            <div className="text-sm text-slate-600">{analysis.confirmation_reason}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Multi-Timeframe Analysis */}
                    {analysis.timeframe_analysis && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-lg border border-slate-200/80 shadow-xl p-6"
                      >
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">
                          Multi-Timeframe Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(analysis.timeframe_analysis).map(([tf, data]) => (
                            <TimeframeTile
                              key={tf}
                              timeframe={tf}
                              data={data as any}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Market Data */}
                    {analysis.market_data && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-lg border border-slate-200/80 shadow-xl p-6"
                      >
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Market Data</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-slate-50 p-4 rounded-xl">
                            <div className="text-sm text-slate-500">Pair</div>
                            <div className="font-bold text-slate-800">{analysis.market_data.pair}</div>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-xl">
                            <div className="text-sm text-slate-500">Current Price</div>
                            <div className="font-bold text-slate-800">${analysis.market_data.current_price}</div>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-xl">
                            <div className="text-sm text-slate-500">Timeframes</div>
                            <div className="font-bold text-slate-800">{analysis.market_data.timeframes_analyzed?.length || 0}</div>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-xl">
                            <div className="text-sm text-slate-500">Data Quality</div>
                            <div className="font-bold text-slate-800 capitalize">{analysis.market_data.data_quality}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}