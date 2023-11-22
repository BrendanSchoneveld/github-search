import styled from "styled-components";

export const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
  font-size: 16px;
  line-height: 1.4;
`;

export const TableRow = styled.tr`
	vertical-align: middle;
	outline: 0;
`;

export const TableHeadCell = styled.th`
  border-bottom: 1px solid black;
	text-align: left;
	padding: 16px;
	color: black;
	font-weight: 600;
	white-space: nowrap;
`;

export const TableBodyCell = styled.td`
	border-bottom: 1px solid black;
	text-align: left;
	padding: 16px;
	color: #003082;
`;
