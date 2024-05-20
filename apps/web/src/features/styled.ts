import styled from 'styled-components';

export const DetailsContainer = styled.div`
  padding: 16px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255);
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  gap: 8px;
`;

export const Key = styled.p`
  width: 100px;
  background-color: rgba(0, 119, 204, 1);
  border-radius: 6px;
  padding: 8px;
  display: flex;
  align-items: center;
  color: white;
`;

export const Value = styled.p`
  width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid black;
  padding: 8px;
  display: flex;
  align-items: center;
`;

export const KeyValue = styled.div`
  display: flex;
  gap: 12px;
  height: auto;
`;
