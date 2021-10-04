import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// DEMO
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// // OUR FUNC
// function createData(movie, reviews, rating, the_genre) {
//   return { movie, reviews, rating, the_genre };
// }

  // Our data
  // let sqlTableResponse = [   {     avg_rating: '4.0000000000000000',     movie_name: 'Brave',     total_reviews: '2',     genre: 'animated'   },   {     avg_rating: '5.0000000000000000',     movie_name: 'Cars',     total_reviews: '1',     genre: 'animated'   },   {     avg_rating: '3.0000000000000000',     movie_name: 'Frozen',     total_reviews: '1',     genre: 'animated'   },   {     avg_rating: '1.00000000000000000000',     movie_name: 'Onward',     total_reviews: '1',     genre: 'animated'   },   {     avg_rating: '2.5000000000000000',     movie_name: 'Titanic',     total_reviews: '2',     genre: 'live-action'   } ]


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

  // Make our data rows
  // console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: results.jsx ~ line 52 ~ Results ~ constructor ~ rows")
  // const rows = [];

  // // Make the custom function row
  // for (let i = 0; i < sqlTableResponse.length; i++) {
  //   const movie_name = sqlTableResponse[i].movie_name;
  //   const total_reviews = sqlTableResponse[i].total_reviews;
  //   const avg_rating = sqlTableResponse[i].avg_rating;
  //   const genre = sqlTableResponse[i].genre;
  //   rows.push(createData(movie_name, total_reviews, avg_rating, genre);
  // }

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Movie name</StyledTableCell>
            <StyledTableCell align="right">Total reviews</StyledTableCell>
            <StyledTableCell align="right">Average rating</StyledTableCell>
            <StyledTableCell align="right">Genre</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
