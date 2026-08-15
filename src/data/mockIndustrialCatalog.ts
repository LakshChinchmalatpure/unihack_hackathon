import { EnrichedProduct, BatchItem } from "../types";

export const SAMPLE_PRODUCTS: EnrichedProduct[] = [
  {
    id: "sku-001",
    partNumber: "6004-2RS",
    brand: "SKF",
    standardizedTitle: "SKF 6004-2RS Deep Groove Radial Ball Bearing - 20mm Bore, 42mm OD, 12mm Width, Dual NBR Contact Seals",
    category: "Deep Groove Ball Bearings",
    unspscCode: "31171504",
    unspscTitle: "Ball bearings",
    etimClassCode: "EC000410",
    etimClassName: "Deep groove ball bearing",
    eclassCode: "23-05-08-01",
    longDescription: "The SKF 6004-2RS is a single-row deep groove radial ball bearing engineered for high rotational speeds, radial load capacities, and light axial thrust in both directions. Features double-sided synthetic nitrile butadiene rubber (NBR) contact seals pre-lubricated with high-grade polyurea grease to prevent contaminant ingress and eliminate re-greasing in automated industrial applications.",
    featuresAndBenefits: [
      "Precision ground raceways ensure whisper-quiet operation and low vibrational harmonics (ISO P0/ABEC-1).",
      "Factory-greased with high-performance mineral oil-based grease (-40°C to +120°C temperature envelope).",
      "Dual 2RS contact lip seals maximize dust, moisture, and slurry exclusion in hostile environments.",
      "Optimized internal ball geometry provides 9.95 kN dynamic load and 5.00 kN static load capacity.",
      "Standard CN radial internal clearance suited for direct press-fit shaft and housing installations."
    ],
    applications: [
      "Industrial AC/DC electric motors (Frame 71/80)",
      "High-speed conveyor roller idlers & material handling",
      "Centrifugal pumps and HVAC fan blowers",
      "Agricultural gearboxes and automated packaging machinery"
    ],
    targetIndustries: [
      "Factory Automation & Material Handling",
      "Automotive & Electric Vehicle Drivetrains",
      "Food & Beverage Packaging Equipment",
      "Pumps, Compressors & Fluid Power"
    ],
    specifications: [
      { attributeName: "Bore Diameter (d)", value: "20.00", unit: "mm", confidenceScore: 99, source: "ISO 15 Standard & OEM Master Spec", validationRule: "Rule: Bore < Outer Diameter (20.00 < 42.00) Passed" },
      { attributeName: "Outside Diameter (D)", value: "42.00", unit: "mm", confidenceScore: 99, source: "ISO 15 Standard & OEM Master Spec", validationRule: "Rule: OD > Width (42.00 > 12.00) Passed" },
      { attributeName: "Width / Thickness (B)", value: "12.00", unit: "mm", confidenceScore: 99, source: "ISO 15 Standard & OEM Master Spec", validationRule: "Standard Metric Dimension Series 60" },
      { attributeName: "Basic Dynamic Load Rating (Cr)", value: "9.95", unit: "kN", confidenceScore: 96, source: "ISO 281 Calculation Formula", validationRule: "Cr dynamic rating verified against ball size" },
      { attributeName: "Basic Static Load Rating (Cor)", value: "5.00", unit: "kN", confidenceScore: 96, source: "ISO 76 Static Load Norm", validationRule: "Static safety factor Cor/Cr = 0.502" },
      { attributeName: "Fatigue Load Limit (Pu)", value: "0.212", unit: "kN", confidenceScore: 92, source: "SKF General Catalog 17000", validationRule: "High-grade 100Cr6 steel fatigue threshold" },
      { attributeName: "Limiting Speed (Grease)", value: "11,000", unit: "RPM", confidenceScore: 94, source: "OEM Contact Seal Friction Limit Table", validationRule: "Surface velocity dN <= 220,000 limit check" },
      { attributeName: "Reference Thermal Speed", value: "38,000", unit: "RPM", confidenceScore: 90, source: "ISO 15312 Thermal Equilibrium", validationRule: "Open-bearing thermal baseline reference" },
      { attributeName: "Closure / Sealing Type", value: "Dual NBR Contact Seals (2RS1)", unit: "", confidenceScore: 99, source: "Part Suffix Decomposition (-2RS)", validationRule: "Lip seal elastomer chemical resistance check" },
      { attributeName: "Cage / Retainer Material", value: "Pressed Carbon Sheet Steel", unit: "", confidenceScore: 95, source: "OEM Standard Ribbon Cage Spec", validationRule: "Normal ambient temperature cage norm" },
      { attributeName: "Radial Internal Clearance", value: "CN (Normal: 5 - 20 µm)", unit: "µm", confidenceScore: 97, source: "ISO 5753-1:2009 Standards", validationRule: "Baseline clearance for standard fit" },
      { attributeName: "Bearing Steel Grade", value: "100Cr6 / SAE 52100 High Carbon Chrome", unit: "", confidenceScore: 98, source: "ASTM A295 Material Spec", validationRule: "Hardness test: 58-62 HRC validated" },
      { attributeName: "Operating Temperature Range", value: "-40 to +120", unit: "°C", confidenceScore: 96, source: "Grease & NBR Seal Spec Sheet", validationRule: "Thermal boundary check passed" },
      { attributeName: "Approximate Net Mass", value: "0.069", unit: "kg", confidenceScore: 95, source: "Engineering Weight Database", validationRule: "Mass density check (7.85 g/cm3) passed" }
    ],
    crossReferences: [
      { competitorBrand: "Timken", competitorPartNumber: "6004-2RS", matchType: "Direct OEM Exact", confidence: 99, notes: "Identical dimensions, NBR rubber seals, and standard clearance.", priceRatio: "0.95x" },
      { competitorBrand: "NSK", competitorPartNumber: "6004-DDU", matchType: "Direct OEM Exact", confidence: 99, notes: "Direct Japanese OEM interchange with dual contact seals.", priceRatio: "0.92x" },
      { competitorBrand: "FAG / Schaeffler", competitorPartNumber: "6004-2RSR", matchType: "Direct OEM Exact", confidence: 99, notes: "Identical DIN 625-1 boundary specs and dynamic load capacity.", priceRatio: "1.02x" },
      { competitorBrand: "NTN", competitorPartNumber: "6004-LLU", matchType: "Direct OEM Exact", confidence: 98, notes: "Synthetic rubber contact seal on both sides.", priceRatio: "0.90x" },
      { competitorBrand: "Koyo / JTEKT", competitorPartNumber: "6004-2RS", matchType: "Direct OEM Exact", confidence: 98, notes: "Drop-in mechanical interchangeability.", priceRatio: "0.88x" }
    ],
    compliance: {
      rohs: "Compliant",
      reach: "SVHC Free",
      prop65: "No Warning Required",
      certifications: ["ISO 9001:2015", "RoHS 3 Directive (EU 2015/863)", "REACH Regulation (EC 1907/2006)", "DIN 625-1", "ABMA Standard 20"]
    },
    qualityScore: 98,
    validationSummary: {
      ruleChecksPassed: 24,
      ruleChecksTotal: 24,
      multiSourceVerified: true,
      hallucinationRisk: "Low",
      notes: "100% verified against ISO 15 dimensional standards, SKF Master Engineering Handbook, and cross-referenced with 5 OEM bearing tables.",
      auditTrail: [
        { checkName: "Dimensional Geometry Integrity", passed: true, detail: "Bore (20mm) < OD (42mm) and Width (12mm) matches ISO Series 60." },
        { checkName: "Unit Standardization", passed: true, detail: "Metric dimensions validated with zero imperial rounding errors." },
        { checkName: "Load Rating Physics Sanity", passed: true, detail: "Dynamic load Cr (9.95kN) > Static load Cor (5.00kN) verified." },
        { checkName: "Multi-Source Cross-Check", passed: true, detail: "Confirmed exact match across 5 global bearing manufacturers." }
      ]
    },
    rawInput: {
      partNumber: "6004-2RS",
      brand: "SKF",
      shortDescription: "Deep groove ball bearing 20x42x12 rubber seals",
      categoryHint: "Bearings"
    },
    status: "Approved"
  },
  {
    id: "sku-002",
    partNumber: "3RT2026-1BB40",
    brand: "Siemens",
    standardizedTitle: "Siemens SIRIUS 3RT2026-1BB40 3-Pole Power Contactor - 25A (AC-3 400V 11kW), 24V DC Control Coil, 1NO+1NC Aux, Screw Terminals Size S0",
    category: "Motor Starters & Contactors",
    unspscCode: "39121529",
    unspscTitle: "Motor contactors",
    etimClassCode: "EC000066",
    etimClassName: "Power contactor, AC switching",
    eclassCode: "27-37-10-03",
    longDescription: "The Siemens 3RT2026-1BB40 is a Size S0 modular power contactor designed for switching 3-phase electric motors up to 11 kW at 400 V AC-3 (25 Amperes rated operational current). Equipped with an energy-efficient 24V DC magnet coil, integrated 1NO + 1NC auxiliary contacts, and standard screw terminals for mounting on 35mm DIN rail or screw panel fixing.",
    featuresAndBenefits: [
      "SIRIUS modular system design allows snap-on surge suppressors, thermal overload relays, and auxiliary contact blocks.",
      "High electrical switching endurance: 1.5 million operating cycles at rated AC-3 load.",
      "Integrated varistor / diode surge protection circuit prevents PLC output card damage during coil switch-off.",
      "Finger-safe terminal IP20 protection according to IEC 60529 with screw-clamp connections.",
      "Global approvals (IEC, UL, CSA, CCC, EAC, Marine DNV/GL) for worldwide machine export."
    ],
    applications: [
      "Direct-on-line (DOL) and reversing starter circuits for 3-phase induction motors",
      "Industrial heating resistive loads and lighting panel switching",
      "Automated assembly conveyor belts and HVAC fan controllers",
      "Compressor pump power management panels"
    ],
    targetIndustries: [
      "Industrial Automation & Machine Building (OEM)",
      "Electrical Control Panel Integration",
      "Renewable Energy & Wind Power Inverters",
      "Commercial HVAC & Water Treatment"
    ],
    specifications: [
      { attributeName: "Rated Operational Current Ie (AC-3, 400V)", value: "25.0", unit: "A", confidenceScore: 99, source: "IEC 60947-4-1 Table", validationRule: "AC-3 current verified for 11kW motor load" },
      { attributeName: "Rated Operational Power Pe (AC-3, 400V)", value: "11.0", unit: "kW", confidenceScore: 99, source: "Siemens SIRIUS Master Catalog", validationRule: "Power formula: P = sqrt(3)*400V*25A*0.85 = 14.7kVA -> 11kW pass" },
      { attributeName: "Control Supply Coil Voltage (Us)", value: "24", unit: "V DC", confidenceScore: 99, source: "Suffix Decoding (-1BB40)", validationRule: "DC Coil voltage matches standard 24V PLC power rail" },
      { attributeName: "Contactor Size / Frame", value: "Size S0", unit: "", confidenceScore: 98, source: "SIRIUS Modular System Specification", validationRule: "Physical width: 45mm standardized footprint" },
      { attributeName: "Number of Main Poles", value: "3 NO (Normally Open)", unit: "Poles", confidenceScore: 99, source: "Standard Contactor Architecture", validationRule: "3-phase power line configuration" },
      { attributeName: "Auxiliary Contact Configuration", value: "1 NO + 1 NC Integrated", unit: "", confidenceScore: 97, source: "Internal Switch Mechanism Specs", validationRule: "Auxiliary interlock contact safety certified" },
      { attributeName: "Rated Insulation Voltage (Ui)", value: "690", unit: "V", confidenceScore: 96, source: "IEC 60947-1 Standard", validationRule: "Insulation dielectric strength test passed" },
      { attributeName: "Rated Impulse Withstand Voltage (Uimp)", value: "6", unit: "kV", confidenceScore: 95, source: "IEC Surge Immunity Spec", validationRule: "Surge category III compliance verified" },
      { attributeName: "Mechanical Service Life", value: "10,000,000", unit: "Operating Cycles", confidenceScore: 94, source: "OEM Reliability Test Database", validationRule: "ISO 13849-1 B10d safety data confirmed" },
      { attributeName: "Ambient Operating Temperature", value: "-25 to +60", unit: "°C", confidenceScore: 96, source: "Environmental Testing Spec", validationRule: "Thermal boundary check passed" },
      { attributeName: "Terminal Type", value: "Screw Terminals (Pz2)", unit: "", confidenceScore: 98, source: "Part Code -1xxxx", validationRule: "Conductor cross-section: 1 to 10 mm²" }
    ],
    crossReferences: [
      { competitorBrand: "Schneider Electric", competitorPartNumber: "LC1D25BD", matchType: "Functional Equivalent", confidence: 97, notes: "TeSys D 25A 24V DC contactor with 1NO+1NC aux contacts. Drop-in electrical match.", priceRatio: "1.05x" },
      { competitorBrand: "ABB", competitorPartNumber: "AF26-30-00-11", matchType: "Functional Equivalent", confidence: 96, notes: "AF series 26A AC-3 24V DC coil with electronic coil interface.", priceRatio: "0.98x" },
      { competitorBrand: "Eaton / Moeller", competitorPartNumber: "DILM25-10(24VDC)", matchType: "Functional Equivalent", confidence: 94, notes: "DILM series 25A 11kW contactor for 35mm DIN rail mounting.", priceRatio: "0.91x" },
      { competitorBrand: "Rockwell / Allen-Bradley", competitorPartNumber: "100-C23DJ10", matchType: "Functional Equivalent", confidence: 95, notes: "Bulletin 100-C industrial contactor, 23A rated, 24V DC coil.", priceRatio: "1.18x" }
    ],
    compliance: {
      rohs: "Compliant",
      reach: "SVHC Free",
      prop65: "No Warning Required",
      certifications: ["CE", "UL 60947-4-1", "CSA C22.2 No. 60947-4-1", "CCC", "IEC/EN 60947-4-1", "EAC"]
    },
    qualityScore: 97,
    validationSummary: {
      ruleChecksPassed: 21,
      ruleChecksTotal: 21,
      multiSourceVerified: true,
      hallucinationRisk: "Low",
      notes: "Verified against Siemens SIRIUS master documentation, IEC 60947-4-1 motor rating standards, and UL industrial control listings.",
      auditTrail: [
        { checkName: "Electrical Power Consistency", passed: true, detail: "25A rating correctly matches 11kW @ 400V AC-3." },
        { checkName: "Coil Voltage Disambiguation", passed: true, detail: "Suffix -1BB40 decoded to 24V DC magnet coil with 100% confidence." },
        { checkName: "DIN Rail Footprint Verification", passed: true, detail: "Frame Size S0 (45mm width) fits standard 35mm top hat rail EN 50022." }
      ]
    },
    rawInput: {
      partNumber: "3RT2026-1BB40",
      brand: "Siemens",
      shortDescription: "Contactor 25A 24VDC 1NO 1NC screw terminal",
      categoryHint: "Motor Controls"
    },
    status: "Approved"
  },
  {
    id: "sku-003",
    partNumber: "D1VW001CNJW",
    brand: "Parker Hannifin",
    standardizedTitle: "Parker D1VW001CNJW NFPA D03 / ISO 4401 Size 03 Directional Control Valve - 4-Way 3-Position Closed Center, 24V DC Solenoid, 350 Bar Max",
    category: "Hydraulic Directional Control Valves",
    unspscCode: "40141611",
    unspscTitle: "Hydraulic valves",
    etimClassCode: "EC011036",
    etimClassName: "Directional control valve (hydraulic)",
    eclassCode: "23-01-01-01",
    longDescription: "The Parker D1VW001CNJW is an industrial subplate-mounted 4-way, 3-position (closed center spool 001) directional control valve. Features wet-pin armature solenoids with removable 24V DC coils and DIN 43650 Hirschmann connector interface, delivering up to 80 L/min (21 GPM) nominal flow and rated for maximum operating pressures of 350 bar (5000 PSI) in heavy-duty industrial hydraulic power units.",
    featuresAndBenefits: [
      "Low pressure drop spool and body design increases overall hydraulic power efficiency.",
      "Wet-pin armature technology cushions solenoid shifting and dissipates heat directly into hydraulic fluid.",
      "Manual override pushbutton standard for quick diagnostic commissioning without electrical power.",
      "Standard ISO 4401-03 / CETOP 03 / NFPA D03 subplate mounting pattern guarantees universal interchangeability.",
      "High flow capability up to 80 L/min with low internal spool leakage under continuous duty."
    ],
    applications: [
      "Industrial hydraulic presses and metal forming equipment",
      "Plastic injection molding and blow molding machines",
      "Material handling hydraulic power packs (HPU) and scissor lifts",
      "Steel mill automation and hydraulic cylinder actuation"
    ],
    targetIndustries: [
      "Industrial Machinery & Fluid Power",
      "Metalworking & Foundry Systems",
      "Plastics & Rubber Manufacturing",
      "Off-Highway & Mobile Construction Equipment"
    ],
    specifications: [
      { attributeName: "Mounting Interface Standard", value: "NFPA D03 / CETOP 03 / ISO 4401-03", unit: "", confidenceScore: 99, source: "ISO 4401 Subplate Mounting Standard", validationRule: "Subplate bolt pattern matches 4x M5-6H" },
      { attributeName: "Valve Configuration", value: "4-Way, 3-Position (4/3)", unit: "", confidenceScore: 99, source: "Spanner Spool Code 001", validationRule: "Port porting logic: P, T, A, B verified" },
      { attributeName: "Spool Center Condition", value: "Spool 001: All Ports Closed (P, A, B, T Blocked in Center)", unit: "", confidenceScore: 98, source: "Parker Hydraulic Spool Nomenclature", validationRule: "Hydraulic circuit neutral position checked" },
      { attributeName: "Maximum Operating Pressure (Ports P, A, B)", value: "350", unit: "bar (5075 PSI)", confidenceScore: 98, source: "Parker D1VW Catalog HY14-2500", validationRule: "Pressure rating meets DIN EN ISO 4413" },
      { attributeName: "Maximum Tank Port Pressure (Port T)", value: "210", unit: "bar (3045 PSI)", confidenceScore: 95, source: "Parker Tank Line Burst Limit Spec", validationRule: "Tank line pressure safety boundary checked" },
      { attributeName: "Nominal Flow Rate", value: "80", unit: "L/min (21.1 GPM)", confidenceScore: 96, source: "Flow Delta-P Performance Curves", validationRule: "Flow rate verified at deltaP = 5 bar" },
      { attributeName: "Coil Actuation Voltage", value: "24", unit: "V DC", confidenceScore: 99, source: "Part Suffix (J)", validationRule: "Voltage matches industrial DC power supplies" },
      { attributeName: "Electrical Connector Type", value: "DIN 43650 Form A (Hirschmann)", unit: "", confidenceScore: 98, source: "Suffix Code (W)", validationRule: "IP65 environmental ingress rating" },
      { attributeName: "Seal Material", value: "NBR (Nitrile Butadiene Rubber)", unit: "", confidenceScore: 95, source: "Standard Fluid Compatibility Spec", validationRule: "Compatible with mineral oils HLP / HM (DIN 51524)" },
      { attributeName: "Fluid Viscosity Range", value: "10 to 400", unit: "cSt (mm²/s)", confidenceScore: 92, source: "Parker Engineering Fluid Limits", validationRule: "ISO VG 32 / VG 46 standard compliance" }
    ],
    crossReferences: [
      { competitorBrand: "Rexroth / Bosch", competitorPartNumber: "4WE6E6X/EG24N9K4", matchType: "Direct OEM Exact", confidence: 98, notes: "Direct ISO 4401-03 interchange, closed center spool E, 24V DC.", priceRatio: "1.08x" },
      { competitorBrand: "Eaton / Vickers", competitorPartNumber: "DG4V-3-0C-M-U-H7-60", matchType: "Direct OEM Exact", confidence: 97, notes: "NFPA D03 subplate mount, spool 0C, 24V DC solenoid.", priceRatio: "0.96x" },
      { competitorBrand: "Yuken", competitorPartNumber: "DSG-01-3C2-D24-50", matchType: "Functional Equivalent", confidence: 95, notes: "Size 01 hydraulic directional valve, 24V DC, closed center.", priceRatio: "0.82x" }
    ],
    compliance: {
      rohs: "Compliant",
      reach: "SVHC Free",
      prop65: "No Warning Required",
      certifications: ["ISO 4401-03", "NFPA T3.5.1", "CE", "DIN EN ISO 4413"]
    },
    qualityScore: 97,
    validationSummary: {
      ruleChecksPassed: 20,
      ruleChecksTotal: 20,
      multiSourceVerified: true,
      hallucinationRisk: "Low",
      notes: "Subplate dimensions, spool 001 closed-center porting, and 350 bar pressure limits 100% validated.",
      auditTrail: [
        { checkName: "Spool Center Porting Sanity", passed: true, detail: "Code 001 confirmed as all ports blocked (P, T, A, B closed) in de-energized state." },
        { checkName: "Pressure Differential Thresholds", passed: true, detail: "Main port 350 bar vs Tank port 210 bar boundary strictly enforced." }
      ]
    },
    rawInput: {
      partNumber: "D1VW001CNJW",
      brand: "Parker",
      shortDescription: "Hydraulic directional valve D03 24VDC 4-way 3-pos closed center",
      categoryHint: "Hydraulics"
    },
    status: "Approved"
  },
  {
    id: "sku-004",
    partNumber: "ATV320U15N4C",
    brand: "Schneider Electric",
    standardizedTitle: "Schneider Electric Altivar Machine ATV320 ATV320U15N4C Compact Variable Speed Drive - 1.5 kW (2.0 HP), 380-500V 3-Phase, Embedded Modbus/CANopen",
    category: "Variable Frequency Drives (VFD)",
    unspscCode: "39122001",
    unspscTitle: "Variable frequency drives",
    etimClassCode: "EC001857",
    etimClassName: "Frequency converter =< 1 kV",
    eclassCode: "27-02-31-01",
    longDescription: "The Schneider Electric Altivar ATV320U15N4C is a compact variable frequency drive engineered for 3-phase asynchronous and synchronous motors rated at 1.5 kW (2.0 HP) on 380V to 500V AC lines. Features built-in safety functions (Safe Torque Off SIL3/PLe), embedded Modbus RTU and CANopen communication protocols, and conformal-coated printed circuit boards (3C3/3S2) for harsh industrial climates.",
    featuresAndBenefits: [
      "Embedded functional safety: Safe Torque Off (STO) SIL 3 / PL e certified according to IEC 61508 / ISO 13849-1.",
      "High dynamic torque: 200% starting torque with open-loop sensorless vector control algorithm.",
      "Compact book format enclosure minimizes control cabinet panel footprint and allows side-by-side mounting.",
      "Integrated EMC filter Category C2 compliant with IEC 61800-3 for reduced electrical noise emissions.",
      "Class 3C3 and 3S2 conformal coating on internal electronics resists chemical vapors and dust particles."
    ],
    applications: [
      "Material handling conveyors, palletizers, and automated sorting tables",
      "Packaging machinery, shrink wrappers, and labeling systems",
      "Pumps, fans, blowers, and air handling units in industrial facilities",
      "Textile processing machinery and commercial woodworking equipment"
    ],
    targetIndustries: [
      "Automated Material Handling & Logistics",
      "Packaging & Food Processing Equipment",
      "Commercial HVAC & Water Pumps",
      "Textile & Woodworking Machine Builders"
    ],
    specifications: [
      { attributeName: "Motor Output Power (Heavy Duty)", value: "1.5", unit: "kW (2.0 HP)", confidenceScore: 99, source: "ATV320 Catalog Reference", validationRule: "Power rating matches U15 code" },
      { attributeName: "Supply Voltage Rating", value: "380 to 500 (-15% / +10%)", unit: "V AC 3-Phase", confidenceScore: 99, source: "Voltage Suffix N4", validationRule: "Input line frequency 50/60 Hz tolerance checked" },
      { attributeName: "Continuous Output Current", value: "4.1", unit: "A (at 4 kHz switching frequency)", confidenceScore: 97, source: "IEC Drive Output Current Spec", validationRule: "Current matches 1.5kW 400V motor FLA calculation" },
      { attributeName: "Max Transient Overload Current", value: "6.2", unit: "A (for 60 seconds / 150% overload)", confidenceScore: 96, source: "Heavy Duty Thermal Sizing Guide", validationRule: "150% HD overload factor verified" },
      { attributeName: "Output Frequency Range", value: "0.1 to 599", unit: "Hz", confidenceScore: 98, source: "ATV320 Technical Manual", validationRule: "High-speed spindle motor capability confirmed" },
      { attributeName: "Integrated Communication Bus", value: "Modbus RTU (RJ45) & CANopen", unit: "", confidenceScore: 98, source: "Standard Firmware Architecture", validationRule: "RS485 physical layer baud rates 4.8 to 38.4 kbps" },
      { attributeName: "Functional Safety Rating", value: "Safe Torque Off (STO) SIL 3 / PL e", unit: "", confidenceScore: 99, source: "TÜV Rheinland Safety Certificate", validationRule: "Dual redundant safety input logic verified" },
      { attributeName: "Enclosure Ingress Protection", value: "IP20 / UL Type 1 (with conduit box)", unit: "", confidenceScore: 98, source: "NEMA / IEC Enclosure Standards", validationRule: "Cabinet internal mounting standard" },
      { attributeName: "Operating Temperature without Derating", value: "-10 to +50", unit: "°C (up to +60°C with derating)", confidenceScore: 95, source: "Thermal Management Guidelines", validationRule: "Thermal boundary check passed" }
    ],
    crossReferences: [
      { competitorBrand: "ABB", competitorPartNumber: "ACS380-040S-04A0-4", matchType: "Functional Equivalent", confidence: 97, notes: "Machinery drive 1.5kW 400V 3-phase, integrated STO safety.", priceRatio: "1.02x" },
      { competitorBrand: "Siemens", competitorPartNumber: "6SL3210-5BE21-5UV0", matchType: "Functional Equivalent", confidence: 96, notes: "SINAMICS V20 1.5kW 400V 3AC inverter with built-in Modbus.", priceRatio: "0.94x" },
      { competitorBrand: "Danfoss", competitorPartNumber: "VLT Micro Drive FC 51 1.5kW", matchType: "Functional Equivalent", confidence: 94, notes: "Compact OEM automation drive 3-phase 380-480V.", priceRatio: "0.91x" },
      { competitorBrand: "Yaskawa", competitorPartNumber: "GA500 GA50U4004ABA", matchType: "Functional Equivalent", confidence: 96, notes: "1.5kW 400V industrial AC microdrive with dual rating.", priceRatio: "1.06x" }
    ],
    compliance: {
      rohs: "Compliant",
      reach: "SVHC Free",
      prop65: "No Warning Required",
      certifications: ["CE", "UL 508C / UL 61800-5-1", "CSA", "RCM", "EAC", "ATEX (Safe Torque Off in explosive atmospheres)"]
    },
    qualityScore: 98,
    validationSummary: {
      ruleChecksPassed: 22,
      ruleChecksTotal: 22,
      multiSourceVerified: true,
      hallucinationRisk: "Low",
      notes: "Motor kW to continuous current (4.1A) and 380-500V 3-phase power ratings confirmed via Schneider Electric engineering documentation.",
      auditTrail: [
        { checkName: "Power Rating vs Output Current Consistency", passed: true, detail: "4.1A nominal output matches standard 1.5kW induction motor power factor (cos phi 0.82)." },
        { checkName: "Safety Classification Integrity", passed: true, detail: "STO SIL3 / PL e dual channel emergency stop architecture certified." }
      ]
    },
    rawInput: {
      partNumber: "ATV320U15N4C",
      brand: "Schneider Electric",
      shortDescription: "VFD drive 1.5kW 2HP 3-phase 380-500V compact Altivar",
      categoryHint: "Variable Frequency Drives"
    },
    status: "Approved"
  },
  {
    id: "sku-005",
    partNumber: "DP420",
    brand: "3M",
    standardizedTitle: "3M Scotch-Weld DP420 Off-White Toughened Structural Epoxy Adhesive - 50 mL Duo-Pak Cartridge, 2:1 Ratio, 20-Min Worklife, High Shear/Peel Strength",
    category: "Structural Adhesives & Sealants",
    unspscCode: "31201601",
    unspscTitle: "Adhesives",
    etimClassCode: "EC000529",
    etimClassName: "Adhesive / glue",
    eclassCode: "23-06-01-01",
    longDescription: "3M Scotch-Weld Epoxy Adhesive DP420 is a toughened, two-part structural epoxy adhesive engineered for bonding metals, composites, ceramics, wood, and engineering plastics. Formulated with high shear strength (4,500 PSI on etched aluminum) and exceptional T-peel strength, it resists cyclic fatigue, impact shocks, environmental weathering, and chemical exposures in high-stress aerospace and industrial assemblies.",
    featuresAndBenefits: [
      "High shear and peel strength provides structural permanent bonding replacing mechanical fasteners, rivets, and spot welds.",
      "Toughened epoxy matrix absorbs vibration, structural flexure, and dynamic impact without cracking.",
      "Convenient 20-minute worklife allows ample part repositioning and alignment before fixture strength.",
      "Controlled flow formula stays in place without sagging in vertical joint bonding applications.",
      "UL 94 HB flammability certified and compliant with aerospace flammability standards."
    ],
    applications: [
      "Permanent bonding of structural metals (steel, aluminum, titanium) in transportation",
      "Carbon fiber and fiberglass composite panel joining in aerospace & marine crafts",
      "Electronic enclosure bonding, magnet bonding in EV electric motors",
      "Sporting goods, high-performance cycling frames, and industrial machinery fairings"
    ],
    targetIndustries: [
      "Aerospace, Defense & Drone Fabrication",
      "Automotive & Electric Vehicle Assembly",
      "Electronics & Precision Instrumentation",
      "Metal Fabrication & Composite Structures"
    ],
    specifications: [
      { attributeName: "Mix Ratio by Volume (Base:Accelerator)", value: "2:1", unit: "", confidenceScore: 100, source: "3M Technical Data Sheet (TDS)", validationRule: "Duo-pak standard 2:1 cartridge geometry" },
      { attributeName: "Worklife / Pot Life (at 23°C / 73°F)", value: "20", unit: "Minutes", confidenceScore: 98, source: "3M ASTM D2471 Test Standard", validationRule: "Gel time thermal measurement validated" },
      { attributeName: "Time to Handling Strength", value: "2", unit: "Hours (at 23°C)", confidenceScore: 97, source: "3M Technical Data Sheet", validationRule: "Handling threshold > 50 PSI shear strength verified" },
      { attributeName: "Full Cure Time (at 23°C)", value: "24", unit: "Hours", confidenceScore: 98, source: "3M Standard Cure Protocol", validationRule: "Heat acceleration: 2 hours @ 65°C cure validated" },
      { attributeName: "Overlap Shear Strength (Etched Aluminum, 23°C)", value: "4,500", unit: "PSI (31.0 MPa)", confidenceScore: 99, source: "ASTM D1002 Standard Lap Shear Test", validationRule: "Shear strength meets structural epoxy criteria" },
      { attributeName: "T-Peel Strength (Aluminum, 23°C)", value: "50", unit: "PIW (pounds per inch width / 88 N/cm)", confidenceScore: 98, source: "ASTM D1876 Peel Adhesion Standard", validationRule: "Toughened formulation peel resistance validated" },
      { attributeName: "Operating Temperature Range", value: "-55 to +121", unit: "°C (-67 to +250 °F)", confidenceScore: 96, source: "3M Long-Term Thermal Cycling Data", validationRule: "Thermal boundary check passed" },
      { attributeName: "Container / Package Type", value: "50 mL Duo-Pak Dual Cartridge", unit: "", confidenceScore: 99, source: "EPX Applicator Dispense Standard", validationRule: "Fits 3M EPX Plus II dispensing gun" },
      { attributeName: "Cured Color", value: "Off-White / Light Amber", unit: "", confidenceScore: 99, source: "Product Specification Table", validationRule: "Visual appearance verification" }
    ],
    crossReferences: [
      { competitorBrand: "Henkel / Loctite", competitorPartNumber: "EA E-20HP (Hysol)", matchType: "Functional Equivalent", confidence: 97, notes: "High strength toughened industrial epoxy, 20-min worklife, 50ml dual cartridge.", priceRatio: "0.92x" },
      { competitorBrand: "Permabond", competitorPartNumber: "ET515 / ET538", matchType: "Functional Equivalent", confidence: 93, notes: "Toughened 2-part structural epoxy with high peel resistance.", priceRatio: "0.85x" },
      { competitorBrand: "Lord (Parker)", competitorPartNumber: "Lord 310 / 320 Epoxy", matchType: "Functional Equivalent", confidence: 94, notes: "Structural assembly adhesive for metal-to-composite bonding.", priceRatio: "1.04x" }
    ],
    compliance: {
      rohs: "Compliant",
      reach: "SVHC Free",
      prop65: "No Warning Required",
      certifications: ["UL 94 HB", "RoHS 3 (2015/863/EU)", "REACH Compliant", "Boeing BMS 5-107 compliant"]
    },
    qualityScore: 99,
    validationSummary: {
      ruleChecksPassed: 19,
      ruleChecksTotal: 19,
      multiSourceVerified: true,
      hallucinationRisk: "Low",
      notes: "Extracted and cross-verified from official 3M Scotch-Weld DP420 technical data bulletin 70-0709-3850-2.",
      auditTrail: [
        { checkName: "Chemistry Mix Ratio Validation", passed: true, detail: "2:1 base-to-accelerator volumetric ratio verified against cartridge plunger type." },
        { checkName: "Unit Normalization Check", passed: true, detail: "4500 PSI cleanly normalized to 31.0 MPa with accurate conversion multiplier (1 PSI = 6.89476 kPa)." }
      ]
    },
    rawInput: {
      partNumber: "DP420",
      brand: "3M",
      shortDescription: "Scotch-Weld epoxy adhesive 50ml duo-pak off-white 20min worklife",
      categoryHint: "Adhesives"
    },
    status: "Approved"
  },
  {
    id: "sku-006",
    partNumber: "DSBC-32-100-PPVA-N3",
    brand: "Festo",
    standardizedTitle: "Festo DSBC-32-100-PPVA-N3 ISO 15552 Standard Pneumatic Cylinder - 32mm Bore, 100mm Stroke, Self-Adjusting Pneumatic Cushioning (PPV), Proximity Sensor Ready",
    category: "Pneumatic Cylinders & Actuators",
    unspscCode: "31251501",
    unspscTitle: "Pneumatic cylinders",
    etimClassCode: "EC000085",
    etimClassName: "Pneumatic cylinder",
    eclassCode: "27-02-12-01",
    longDescription: "The Festo DSBC-32-100-PPVA-N3 is a double-acting profile pneumatic cylinder conforming to ISO 15552 standards. Features a 32 mm piston diameter and 100 mm stroke length with Festo patented PPS self-adjusting end-position cushioning, magnetic piston for contactless proximity sensing, and robust hard-anodized aluminum barrel for maximum operational cycle life in automation cells.",
    featuresAndBenefits: [
      "Self-adjusting pneumatic end-position cushioning (PPS) eliminates manual adjustment screws and lowers machine setup time by 80%.",
      "Conforms to ISO 15552 / VDMA 24562 standards for universal global mounting interchangeability.",
      "Integrated sensor slots on three profile sides accommodate flush-mount magnetic cylinder switches (Festo SMT-8M).",
      "Low friction dynamic polyurethane (PUR) seals ensure smooth breakaway and operation at low supply pressures.",
      "Corrosion resistance class CRC 2 (moderate corrosion stress) suited for general factory automation environments."
    ],
    applications: [
      "Automated pick-and-place gantry systems and parts loading",
      "Clamping, pressing, and positioning fixtures on assembly lines",
      "Packaging machine box erecting, sealing, and divert gates",
      "Material sorting diverters on high-speed roller conveyors"
    ],
    targetIndustries: [
      "Factory Automation & Robotics",
      "Packaging & Material Handling",
      "Food & Beverage Secondary Processing",
      "Automotive Body & Component Assembly"
    ],
    specifications: [
      { attributeName: "Piston / Bore Diameter", value: "32", unit: "mm", confidenceScore: 100, source: "ISO 15552 Standard Dimensions", validationRule: "Bore code 32 verified" },
      { attributeName: "Stroke Length", value: "100", unit: "mm", confidenceScore: 100, source: "Part Number Code -100-", validationRule: "Stroke length sanity checked within standard series" },
      { attributeName: "Piston Rod Thread", value: "M10x1.25 Male", unit: "", confidenceScore: 99, source: "ISO 15552 Rod Specification", validationRule: "Rod thread pitch standard for 32mm bore" },
      { attributeName: "Cushioning Type", value: "PPV: Pneumatic Cushioning, Adjustable at Both Ends", unit: "", confidenceScore: 99, source: "Suffix Code -PPVA-", validationRule: "Cushioning volume calculation verified" },
      { attributeName: "Theoretical Force at 6 bar (Advance)", value: "483", unit: "N (108.5 lbf)", confidenceScore: 98, source: "Pneumatic Formula: F = P * A = 6 bar * 8.04 cm²", validationRule: "Advance thrust calculation verified (482.5 N -> 483 N)" },
      { attributeName: "Theoretical Force at 6 bar (Retract)", value: "415", unit: "N (93.3 lbf)", confidenceScore: 98, source: "Pneumatic Formula with 12mm Rod Area Deduction", validationRule: "Retract thrust calculation verified (414.7 N -> 415 N)" },
      { attributeName: "Operating Pressure Range", value: "0.6 to 12", unit: "bar (8.7 to 174 PSI)", confidenceScore: 97, source: "Festo DSBC Master Catalog", validationRule: "Standard industrial compressed air envelope" },
      { attributeName: "Pneumatic Port Connection", value: "G 1/8 Female Thread", unit: "", confidenceScore: 99, source: "ISO 228-1 Port Standard", validationRule: "Port thread verified for 32mm bore ISO cylinders" },
      { attributeName: "Position Sensing", value: "Magnetic Piston for Proximity Sensors", unit: "", confidenceScore: 99, source: "Suffix Code -A- (Position sensing)", validationRule: "Sensor slot profile checked" }
    ],
    crossReferences: [
      { competitorBrand: "SMC", competitorPartNumber: "CP96SDB32-100C", matchType: "Direct OEM Exact", confidence: 99, notes: "ISO 15552 standard cylinder 32mm bore, 100mm stroke, air cushioning, direct drop-in.", priceRatio: "0.94x" },
      { competitorBrand: "Aventics (Emerson)", competitorPartNumber: "PRA-DA-032-0100-0-2-1", matchType: "Direct OEM Exact", confidence: 98, notes: "Series PRA ISO standard cylinder 32x100mm with profile tube.", priceRatio: "0.98x" },
      { competitorBrand: "Parker", competitorPartNumber: "P1D-S032MS-0100", matchType: "Direct OEM Exact", confidence: 97, notes: "Parker P1D series ISO 15552 pneumatic cylinder.", priceRatio: "1.03x" },
      { competitorBrand: "Norgren", competitorPartNumber: "PRA/802032/M/100", matchType: "Direct OEM Exact", confidence: 98, notes: "ISO 15552 profile cylinder with magnetic piston.", priceRatio: "0.96x" }
    ],
    compliance: {
      rohs: "Compliant",
      reach: "SVHC Free",
      prop65: "No Warning Required",
      certifications: ["ISO 15552", "VDMA 24562", "RoHS 3 (2015/863)", "CE", "ATEX Ex II 2GD (optional)"]
    },
    qualityScore: 99,
    validationSummary: {
      ruleChecksPassed: 23,
      ruleChecksTotal: 23,
      multiSourceVerified: true,
      hallucinationRisk: "Low",
      notes: "ISO 15552 mechanical tolerances, force calculations (483 N / 415 N @ 6 bar), and port G 1/8 validated with exact engineering physics.",
      auditTrail: [
        { checkName: "Pneumatic Thrust Force Calculation", passed: true, detail: "Piston area (804.25 mm²) * 6 bar = 482.55 N advance; rod deducted area (691.15 mm²) * 6 bar = 414.69 N retract. 100% verified." },
        { checkName: "Standard Mounting Profile", passed: true, detail: "Flange, foot bracket, and rear clevis mountings conform strictly to ISO 15552." }
      ]
    },
    rawInput: {
      partNumber: "DSBC-32-100-PPVA-N3",
      brand: "Festo",
      shortDescription: "Pneumatic cylinder 32mm bore 100mm stroke ISO 15552 with cushioning",
      categoryHint: "Pneumatics"
    },
    status: "Approved"
  }
];

export const BATCH_DEMO_ITEMS: BatchItem[] = [
  { id: "b1", partNumber: "6205-2RS", brand: "SKF", shortDescription: "Ball bearing 25x52x15mm sealed", status: "completed", qualityScore: 98, category: "Deep Groove Ball Bearings", unspsc: "31171504", confidence: 99 },
  { id: "b2", partNumber: "LC1D18BD", brand: "Schneider", shortDescription: "TeSys D contactor 18A 24VDC 1NO+1NC", status: "completed", qualityScore: 97, category: "Motor Contactors", unspsc: "39121529", confidence: 98 },
  { id: "b3", partNumber: "4WE6J6X/EG24N9K4", brand: "Rexroth", shortDescription: "Directional spool valve 24VDC subplate D03", status: "completed", qualityScore: 96, category: "Hydraulic Valves", unspsc: "40141611", confidence: 97 },
  { id: "b4", partNumber: "SMT-8M-A-PS-24V-E-2,5-OE", brand: "Festo", shortDescription: "Proximity sensor reed PNP 24V DC", status: "completed", qualityScore: 99, category: "Sensors & Transducers", unspsc: "39121500", confidence: 99 },
  { id: "b5", partNumber: "6000-ZZ", brand: "NSK", shortDescription: "Shielded mini bearing 10x26x8mm", status: "completed", qualityScore: 98, category: "Deep Groove Ball Bearings", unspsc: "31171504", confidence: 98 },
  { id: "b6", partNumber: "3RV2011-1EA10", brand: "Siemens", shortDescription: "Circuit breaker 2.8-4.0A Size S00", status: "completed", qualityScore: 96, category: "Motor Protection Breakers", unspsc: "39121601", confidence: 96 },
  { id: "b7", partNumber: "DP8810NS", brand: "3M", shortDescription: "Low odor acrylic structural adhesive green 45ml", status: "completed", qualityScore: 97, category: "Structural Adhesives", unspsc: "31201601", confidence: 97 },
  { id: "b8", partNumber: "C96SDB40-125C", brand: "SMC", shortDescription: "ISO cylinder 40mm bore 125mm stroke", status: "completed", qualityScore: 99, category: "Pneumatic Cylinders", unspsc: "31251501", confidence: 99 },
  { id: "b9", partNumber: "ACS580-01-07A6-4", brand: "ABB", shortDescription: "General purpose drive 3.0kW 400V IP21", status: "completed", qualityScore: 98, category: "Variable Frequency Drives", unspsc: "39122001", confidence: 98 },
  { id: "b10", partNumber: "E2E-X5ME1 2M", brand: "Omron", shortDescription: "Inductive proximity sensor M12 NPN NO", status: "completed", qualityScore: 97, category: "Proximity Sensors", unspsc: "39121500", confidence: 97 },
  { id: "b11", partNumber: "G600-X-UNSPECIFIED", brand: "GenericCo", shortDescription: "Motor pump accessory unverified part", status: "flagged", qualityScore: 68, category: "Unclassified Mechanical", unspsc: "31170000", confidence: 64, flagReason: "Manufacturer catalog missing; flagged for Human-in-the-Loop review" },
  { id: "b12", partNumber: "UC205-16", brand: "Timken", shortDescription: "Insert ball bearing 1 inch bore set screw lock", status: "completed", qualityScore: 96, category: "Mounted Bearings & Inserts", unspsc: "31171504", confidence: 96 }
];
