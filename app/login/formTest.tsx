// // arquivo de código modelo
// 'use client';
// import { useForm } from "react-hook-form";

// export default function MeuForm() {
//     const { register, handleSubmit, formState: { errors } } = useForm(); 
//     const onSubmit = (data) => console.log(data);

//     return (
//         <>
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input {...register('primeiroNome', { required: true })} />
//             {errors.primeiroNome && <span>Este campo é obrigatório!</span>}

//             <input type="submit" />
//         </form>
//         </>
//     );
// }