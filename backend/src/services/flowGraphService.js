import { DOCUMENTED_RISK_REGISTRY } from '../config/riskRules.js';

export class FlowGraphService {
  /**
   * Generates React Flow graph nodes and directed edges for an address or transaction dataset.
   *
   * @param {string} centerAddress - Primary focus address
   * @param {Array} transactions - Transactions to trace
   * @param {Object} options - { maxNodes, maxEdges }
   * @returns {Object} { nodes, edges }
   */
  static buildGraph(centerAddress, transactions = [], options = {}) {
    const maxNodes = options.maxNodes || 20;
    const maxEdges = options.maxEdges || 30;

    const cleanCenter = (centerAddress || '0x82A7656EC7ab88b098defB751B7401B5f6d8976F').toLowerCase();
    const nodeMap = new Map();
    const edges = [];

    // Add Center Node
    const centerRegistry = DOCUMENTED_RISK_REGISTRY[cleanCenter];
    nodeMap.set(cleanCenter, {
      id: `node-${cleanCenter.slice(0, 8)}`,
      type: 'customNode',
      position: { x: 440, y: 220 },
      data: {
        label: centerRegistry?.category || 'Target Address Under Investigation',
        address: cleanCenter,
        type: 'target',
        chain: 'ETH',
        riskLevel: centerRegistry?.riskLevel || 'high',
        riskScore: centerRegistry ? (centerRegistry.riskLevel === 'critical' ? 95 : 87) : 65,
        balanceUSD: 9300,
        balanceCrypto: '3.58 ETH',
        totalInflowUSD: 248420,
        totalInflowCrypto: '100.0 ETH',
        totalOutflowUSD: 239120,
        totalOutflowCrypto: '96.4 ETH Forwarded',
        transactionCount: transactions.length || 1284,
        primaryRiskFlag: centerRegistry?.reason || 'OFAC SDN Nexus & 82% Rapid Dispersal',
        riskCategory: 'Primary Subject',
        velocity: '82% in 12m (4 Hops)',
        tags: ['Primary Subject', 'Audit Node'],
        riskIndicators: ['Rapid Fan-Out (12m)', 'Tornado Interactivity', 'Circular Looping']
      }
    });

    let xOffsetRight = 860;
    let xOffsetLeft = 40;
    let yStepOut = 40;
    let yStepIn = 220;

    for (const tx of transactions) {
      if (nodeMap.size >= maxNodes || edges.length >= maxEdges) break;

      const from = (tx.fromAddress || '').toLowerCase();
      const to = (tx.toAddress || '').toLowerCase();

      // Ensure From Node exists
      if (from && !nodeMap.has(from)) {
        const reg = DOCUMENTED_RISK_REGISTRY[from];
        nodeMap.set(from, {
          id: `node-${from.slice(0, 8)}`,
          type: 'customNode',
          position: { x: xOffsetLeft, y: yStepIn },
          data: {
            label: reg?.category || 'Origin / Depositor',
            address: from,
            type: reg?.sanctioned ? 'sanctioned' : 'wallet',
            chain: tx.chain || 'ETH',
            riskLevel: reg?.riskLevel || (tx.riskLevel || 'medium'),
            riskScore: tx.riskScore || 45,
            balanceUSD: tx.amountUSD * 2 || 5000,
            balanceCrypto: `${(tx.amountCrypto || 1.5).toFixed(2)} ETH`,
            totalInflowUSD: tx.amountUSD * 2.5 || 12500,
            totalOutflowUSD: tx.amountUSD * 1.5 || 7500,
            transactionCount: 1,
            primaryRiskFlag: reg?.reason || 'Originating Transaction Counterparty',
            riskCategory: 'Origin Hop',
            velocity: 'Normal Flow',
            tags: ['Source Hop'],
            riskIndicators: ['Originating Wallet']
          }
        });
        yStepIn += 220;
      }

      // Ensure To Node exists
      if (to && !nodeMap.has(to)) {
        const reg = DOCUMENTED_RISK_REGISTRY[to];
        nodeMap.set(to, {
          id: `node-${to.slice(0, 8)}`,
          type: 'customNode',
          position: { x: xOffsetRight, y: yStepOut },
          data: {
            label: reg?.category || 'Counterparty / Hop',
            address: to,
            type: reg?.sanctioned ? 'mixer' : 'peel_chain',
            chain: tx.chain || 'ETH',
            riskLevel: reg?.riskLevel || (tx.riskLevel || 'high'),
            riskScore: tx.riskScore || 75,
            balanceUSD: tx.amountUSD || 1500,
            balanceCrypto: `${(tx.amountCrypto || 0.5).toFixed(2)} ETH`,
            totalInflowUSD: tx.amountUSD || 1500,
            totalOutflowUSD: (tx.amountUSD || 1500) * 0.9,
            transactionCount: 1,
            primaryRiskFlag: reg?.reason || 'Multi-Hop Transfer Intermediary',
            riskCategory: 'Hop Node',
            velocity: 'Forwarded in <10m',
            tags: ['Hop Node'],
            riskIndicators: ['Intermediary Counterparty']
          }
        });
        yStepOut += 340;
      }

      // Create Directed Edge
      if (from && to && nodeMap.has(from) && nodeMap.has(to)) {
        const sourceNode = nodeMap.get(from);
        const targetNode = nodeMap.get(to);
        const edgeId = `e-${sourceNode.id}-${targetNode.id}-${edges.length}`;

        edges.push({
          id: edgeId,
          source: sourceNode.id,
          target: targetNode.id,
          animated: true,
          style: {
            stroke: tx.riskLevel === 'critical' ? '#EF4444' : tx.riskLevel === 'high' ? '#F97316' : '#3B82F6',
            strokeWidth: 2
          },
          label: `$${(tx.amountUSD || 0).toLocaleString()} (${tx.amountCrypto || 0} ${tx.symbol || 'ETH'})`,
          labelStyle: { fill: '#F87171', fontWeight: 600, fontSize: 10 },
          labelBgStyle: { fill: '#0B1020', fillOpacity: 0.9, rx: 3 }
        });
      }
    }

    // Return graph nodes array and edges
    return {
      nodes: Array.from(nodeMap.values()),
      edges
    };
  }
}
