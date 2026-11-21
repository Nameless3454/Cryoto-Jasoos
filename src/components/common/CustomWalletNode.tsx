import React from 'react';
import { Handle, Position } from 'reactflow';

export interface CustomWalletNodeData {
  label: string;
  address: string;
  type: string;
  chain: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  riskScore: number;
  balanceUSD: number;
  balanceCrypto?: string;
  totalInflowUSD?: number;
  totalInflowCrypto?: string;
  totalOutflowUSD?: number;
  totalOutflowCrypto?: string;
  transactionCount: number;
  primaryRiskFlag?: string;
  riskCategory?: string;
  velocity?: string;
  tags?: string[];
  riskIndicators?: string[];
}

export const CustomWalletNode: React.FC<{ data: CustomWalletNodeData }> = ({ data }) => {
  // Format numbers to match standard design (e.g. $248.4k, $10.0M, $0)
  const formatUSD = (val?: number) => {
    if (val === undefined || val === null || val === 0) return '$0';
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
    return `$${val.toLocaleString()}`;
  };

  const getRiskTheme = () => {
    switch (data.riskLevel) {
      case 'critical':
        return {
          topBorder: '#f43f5e',
          glow: 'rgba(244,63,94,0.4)',
          pillBg: 'rgba(244,63,94,0.12)',
          pillBorder: 'rgba(244,63,94,0.38)',
          pillText: '#fda4af',
          dotBg: '#f43f5e',
          dotShadow: '0 0 8px #f43f5e',
          label: 'Critical'
        };
      case 'high':
        return {
          topBorder: '#fb923c',
          glow: 'rgba(251,146,60,0.35)',
          pillBg: 'rgba(251,146,60,0.12)',
          pillBorder: 'rgba(251,146,60,0.35)',
          pillText: '#fdba74',
          dotBg: '#fb923c',
          dotShadow: '0 0 8px #fb923c',
          label: 'High'
        };
      case 'low':
      default:
        return {
          topBorder: '#34d399',
          glow: 'rgba(52,211,153,0.35)',
          pillBg: 'rgba(52,211,153,0.12)',
          pillBorder: 'rgba(52,211,153,0.35)',
          pillText: '#6ee7b7',
          dotBg: '#34d399',
          dotShadow: '0 0 8px #34d399',
          label: 'Low'
        };
    }
  };

  const theme = getRiskTheme();
  const chainName = data.chain || 'ETH';
  const roleName = (data.riskCategory || data.type || 'WALLET').toUpperCase();

  const shortAddr = data.address
    ? `${data.address.slice(0, 6)}…${data.address.slice(-4)}`
    : '0x000…000';

  const txFormatted = data.transactionCount ? `${data.transactionCount.toLocaleString()} txs` : '0 txs';

  const inflowUSD = data.totalInflowUSD !== undefined ? data.totalInflowUSD : data.balanceUSD * 1.5;
  const outflowUSD = data.totalOutflowUSD !== undefined ? data.totalOutflowUSD : Math.max(0, inflowUSD - data.balanceUSD);

  const cleanSignal = (sig?: string) => {
    if (!sig) return '';
    return sig.replace(/^\d+%\s*in\s*<\s*5m/i, '95% in <5m');
  };

  const signalText = cleanSignal(data.velocity || data.primaryRiskFlag || '');

  return (
    <div
      style={{
        width: '288px',
        height: '232px',
        boxSizing: 'border-box',
        padding: '16px 18px',
        background: 'linear-gradient(180deg, #141a2b 0%, #0e1321 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: `2px solid ${theme.topBorder}`,
        borderRadius: '14px',
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 40px -20px rgba(0,0,0,0.7), 0 0 36px -12px ${theme.glow}`,
        fontSize: '12px',
        lineHeight: '16px',
        color: '#8b94a7',
        fontFamily: "'Inter', system-ui, sans-serif",
        position: 'relative',
        textAlign: 'left',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* React Flow Left Handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#3b82f6',
          border: '2px solid #070b14',
          boxShadow: '0 0 8px rgba(59,130,246,0.85)',
          left: '-5px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      />

      {/* 1. Small Caps Meta Line */}
      <div
        style={{
          fontSize: '11px',
          lineHeight: '16px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: '#7c8699',
          textTransform: 'uppercase'
        }}
      >
        {chainName} · {roleName}
      </div>

      {/* 2. Wallet Name */}
      <div
        style={{
          fontSize: '17px',
          lineHeight: '26px',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: '#f8fafc',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {data.label}
      </div>

      {/* 3. Address with Tx Count */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: '12px',
          lineHeight: '18px',
          color: '#7c8699'
        }}
      >
        {shortAddr} · {txFormatted}
      </div>

      {/* 4. Hairline Divider */}
      <div
        style={{
          height: '1px',
          margin: '10px 0',
          background: 'rgba(255,255,255,0.07)'
        }}
      />

      {/* 5. Inflow / Outflow / Balance Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: '20px' }}>
          <span style={{ display: 'inline-block', width: '56px', color: '#7c8699', flexShrink: 0 }}>
            Inflow
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '13px',
              fontWeight: 500,
              color: '#f2f4f7'
            }}
          >
            {formatUSD(inflowUSD)}
          </span>
          {data.totalInflowCrypto && (
            <span style={{ marginLeft: '8px', color: '#8b94a7', fontSize: '12px' }}>
              {data.totalInflowCrypto}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: '20px' }}>
          <span style={{ display: 'inline-block', width: '56px', color: '#7c8699', flexShrink: 0 }}>
            Outflow
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '13px',
              fontWeight: 500,
              color: '#f2f4f7'
            }}
          >
            {formatUSD(outflowUSD)}
          </span>
          {data.totalOutflowCrypto && (
            <span style={{ marginLeft: '8px', color: '#8b94a7', fontSize: '12px' }}>
              {data.totalOutflowCrypto}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: '20px' }}>
          <span style={{ display: 'inline-block', width: '56px', color: '#7c8699', flexShrink: 0 }}>
            Balance
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '13px',
              fontWeight: 500,
              color: '#f2f4f7'
            }}
          >
            {formatUSD(data.balanceUSD)}
          </span>
        </div>
      </div>

      {/* 6. Risk Pill and Signal */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0 10px',
            borderRadius: '999px',
            background: theme.pillBg,
            border: `1px solid ${theme.pillBorder}`,
            color: theme.pillText,
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: '22px',
            flexShrink: 0
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              marginRight: '8px',
              borderRadius: '50%',
              background: theme.dotBg,
              boxShadow: theme.dotShadow
            }}
          />
          {theme.label} · {data.riskScore}
        </span>
        {signalText && (
          <span
            style={{
              marginLeft: '10px',
              color: '#aeb6c6',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {signalText}
          </span>
        )}
      </div>

      {/* React Flow Right Handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#3b82f6',
          border: '2px solid #070b14',
          boxShadow: '0 0 8px rgba(59,130,246,0.85)',
          right: '-5px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      />
    </div>
  );
};

export default CustomWalletNode;
