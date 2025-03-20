import { createContext, useContext, useState } from 'react';
import * as yup from 'yup';

const InstituicoesContext = createContext();

export function InstituicoesContextProvider({ children }) {
  let [propriedades, setPropriedades] = useState([]);

  let [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  let instituicoesInitialValues = {
    região: '',
    UF: '',
    município: '',
    mesoregião: '',
    microregião: '',
    entidade: '',
    matrículas: '',
  };

 let instituicoesSchema = yup.object().shape({
     região: yup.string().required('Região é obrigatória'),
     UF: yup.string().required('UF é obrigatória'),
     município: yup.string().required('Município é obrigatório'),
      mesoregião: yup.string().required('Mesoregião é obrigatória'),
     microregião: yup.string().required('Microregião é obrigatória'),
     entidade: yup.string().required('Entidade é obrigatória'),
     matrículas: yup.number().required().positive('Deve ser positivo').integer('Deve ser inteiro')
   });

  return (
    <InstituicoesContext.Provider
      value={{
        propriedades,
        setPropriedades,
        instituicoesInitialValues,
        instituicoesSchema,
        show,
        handleShow,
        setShow
      }}
    >
      {children}
    </InstituicoesContext.Provider>
  );
}

export default function useInstituicoes() {
  return useContext(InstituicoesContext);
}
