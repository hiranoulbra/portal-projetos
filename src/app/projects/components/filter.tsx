'use client';
import * as React from "react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons"
import { Panel } from "@/components/ui/panel";
import { FilterIcon } from "@/utils/icons/filter.icon"
import { FieldText } from "@/components/fields/field.text";
import { FieldSelect } from "@/components/fields/field.select";
import { useEffect, useState } from "react";
import CloseIcon from "@/utils/icons/close.icons";
import { useSearchParams, useRouter } from "next/navigation";
import { DateRange, FieldDateRange } from "@/components/fields/field.date-range";




export const Filter: React.FC<{}> = () => {

    const [project, setProject] = useState('');
    const [startDate, setStartDate] = useState<DateRange>({ start: '', end: '' });
    const [endDate, setEndDate] = useState<DateRange>({ start: '', end: '' });
    const [status, setStatus] = useState('');
    const [hasfilter, setHasfilter] = useState(false);
    const [show, setShow] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const onClear = () => {
        router.push('/projects');
        setShow(false);
    }

    useEffect(() => {
        const q = searchParams.get('q');
        const sd = searchParams.get('sd');
        const ed = searchParams.get('ed');
        const s = searchParams.get('s');
        if (q) {
            setProject(q);
        }
        if (sd) {
            const [start, end] = sd.split('_');
            setStartDate({ start, end });
        } else {
            setStartDate({ start: '', end: '' });
        }

        if (ed) {
            const [start, end] = ed.split('_');
            setEndDate({ start, end });
        } else {
            setEndDate({ start: '', end: '' });
        }
        if (s) {
            setStatus(s);
        } else {
            setStatus('');
        }
        if (q || sd || ed || s) {
            setHasfilter(true);
        } else {
            setHasfilter(false);
        }

    }, [searchParams])


    const onApply = () => {

        const query: Record<string, string> = {};
        if (project) {
            query.q = project;
        }
        if (startDate.start || startDate.end) {
            query.sd = `${startDate.start}_${startDate.end}`;
        }
        if (endDate.start || endDate.end) {
            query.ed = `${endDate.start}_${endDate.end}`;
        }
        if (status) {
            query.s = status;
        }
        router.push('/projects?' + new URLSearchParams(query).toString());
        setShow(false);
    }



    return <React.Fragment>
        <PrimaryButton onClick={() => setShow(true)}><FilterIcon active={hasfilter} /></PrimaryButton>
        {show && <Panel className="max-w-sm flex flex-col justify-between h-full" >

            <div className="flex w-full flex-wrap flex-col">
                <div className="flex p-4 justify-between w-full">
                    <h2 className="text-lg">Filtros</h2>
                    <CloseIcon />
                </div>
                <FieldText placeholder="Pesquisar" value={project} onChange={(ev) => {
                    setProject(ev.target.value);
                }} label={"Projeto"} />


                <FieldDateRange label="Data de início" name="start_date" value={startDate} onChange={setStartDate} />
                <FieldDateRange label="Data de fim" name="start_date" value={endDate} onChange={setEndDate} />
                <FieldSelect label="Status" className="w-full" onChange={(ev) => {
                    setStatus(ev.target.value);
                }} placeholder="Selecione" value={status}>
                    <option value="">Todos</option>
                    <option value="Não iniciado">Não iniciado</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                </FieldSelect>
            </div>
            <div className="flex justify-between p-4 pb-6">
                <PrimaryButton onClick={onApply}>Aplicar</PrimaryButton>
                <SecondaryButton onClick={onClear}>Limpar</SecondaryButton>
            </div>
        </Panel>}
    </React.Fragment >
}