import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Prato',
  },
  {
    id: 'foto',
    numeric: false,
    disablePadding: false,
    label: 'Imagem',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Descrição',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Preço',
  },
  {
    id: 'tipoprato',
    numeric: false,
    disablePadding: false,
    label: 'Tipo de Prato',
  },
  {
    id: 'pratosid',
    numeric: false,
    disablePadding: false,
    label: 'Ações',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function TableItens({ onEditItem, alterou }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pratos, setPratos] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchPratos();
  }, [alterou]);

  const fetchPratos = async () => {
    try {
      const response = await fetch('http://localhost:3333/pratos');
      if (response.ok) {
        const data = await response.json();
        setPratos(data);
      } else {
        throw new Error('Erro ao buscar pratos');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (id) => {
    setSelected(selected === id ? null : id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditarItem = (row) => {
    onEditItem(row);
  };

  const handleDelete = async (id) => {
    if (!id) return alert('Nenhum item selecionado para exclusão.');

    try {
      const response = await fetch(`http://localhost:3333/pratos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSnackbarMessage('Prato deletado com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        fetchPratos();
        setSelected(null);
      } else {
        throw new Error('Erro ao deletar o prato');
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Erro ao conectar com o servidor.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pratos.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...pratos]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, pratos],
  );

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, padding: '40px' }}>
          Lista de itens cadastrados
          <TableContainer sx={{ maxHeight: 440, mt: 4 }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows.map((row) => {
                  const isItemSelected = row.pratosid === selected;
                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(row.pratosid)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.pratosid}
                      selected={isItemSelected}
                    >
                      <TableCell padding="none">{row.name}</TableCell>
                      <TableCell>
                        <Avatar src={row.foto} alt={row.name} />
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell align="right">{`R$ ${row.price}`}</TableCell>
                      <TableCell>{row.tipoprato}</TableCell>
                      <TableCell>
                        <IconButton
                          Tooltip="Editar"
                          sx={{
                            mr: 2,
                            border: '.6px solid #5da0f0',
                            backgroundColor: '#fff',
                            color: '#5da0f0',
                            '&:hover': {
                              color: '#fff',
                              backgroundColor: '#5da0f0'
                            }

                          }}
                          onClick={() => handleEditarItem(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          Tooltip="Excluir"
                          sx={{
                            border: '.6px solid #da3e3f',
                            backgroundColor: '#fff',
                            color: '#F05D5E',
                            '&:hover': {
                              color: '#fff',
                              backgroundColor: '#F05D5E',
                            }
                          }}
                          onClick={() => handleDelete(row.pratosid)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Itens por página"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pratos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </>
  );
}

