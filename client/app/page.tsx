'use client'

import React from 'react'
import styles from './page.module.scss'
import { IAcars } from '@/interfaces/Acars.interface';
import useAcarsStore from '@/redux/acars/acars.hook';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)
//=========================================================================================================================

export default function Home() {
	const [acarsSearchValue, setAcarsSearchValue] = React.useState<string>('');
	const [aircraftSearchValue, setAircraftSearchValue] = React.useState<string>('');
	const [page, setPage] = React.useState<number>(1);

	const { acarsDataStore, setInitialAcars, setMoreAcars } = useAcarsStore();

	const { ref, inView } = useInView({ threshold: 1 });

	const onSearch = async () => {
		const data = await fetch(`http://localhost:5001/api/acars/search`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({ "searchAcarsTextValue": acarsSearchValue.trim(), "searchAircraftTextValue": aircraftSearchValue.trim() }),
		});
		const result: IAcars[] = await data.json();
		setInitialAcars(result);
	}

	const onClear = async () => {
		setAcarsSearchValue('');
		setAircraftSearchValue('');
		fetchData();
	}

	const getMoreAcars = async () => {
		if (acarsDataStore && acarsDataStore.length > 0) {
			const pageDate = Math.ceil(acarsDataStore.length / 100) + page;
			const data = await fetch(`http://localhost:5001/api/acars/more`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({ "page": pageDate }),
			});
			const result: IAcars[] = await data.json();
			setMoreAcars(result);
		}
	}

	const fetchData = async () => {
		const data = await fetch(`http://localhost:5001/api/acars`);
		const result: IAcars[] = await data.json();
		setInitialAcars(result);
	}

	React.useEffect(() => {
		fetchData();
	}, []);

	React.useEffect(() => {
		if (inView) {
			getMoreAcars();
			setPage((prevState) => prevState + 1);
		}
	}, [inView, ref]);

	return (
		<main className={styles.main}>
			<div className={styles.searchBlock}>
				<input
					className={styles.input}
					name='acars'
					type='text'
					value={acarsSearchValue}
					onChange={(e) => setAcarsSearchValue(e.target.value)}
					placeholder='Поиск по тексту акарса'
				/>
				<input
					className={styles.input}
					name='aircraft'
					type='text'
					value={aircraftSearchValue}
					onChange={(e) => setAircraftSearchValue(e.target.value)}
					placeholder='Поиск по самолету'
				/>
				<button className={styles.buttonSearch} onClick={onSearch}>Поиск</button>
				<button className={styles.buttonClear} onClick={onClear}>Сброс поиска</button>
			</div>
			<div className={styles.acarsBlock}  >
				<div className={styles.head}>
					<span className={styles.hex}>HEX-код</span>
					<span className={styles.rego}>Бортовой</span>
					<span className={styles.type}>Тип ЛА</span>
					<span className={styles.description}>Название ЛА</span>
					<span className={styles.callsign}>Позывной</span>
					<span className={styles.text}>Текст акарса</span>
					<span className={styles.timestamp}>Дата и время акарса</span>
					<span className={styles.mission}>Задание</span>
					<span className={styles.from}>Вылет</span>
					<span className={styles.to}>Прилет</span>
				</div>
				{acarsDataStore && acarsDataStore.map((obj, index) => (
					<div key={index} className={`${styles.body} ${(index % 2 === 0) ? styles.even : ''}`}>
						<span className={styles.hex}>{obj.aircraft.hex}</span>
						<span className={styles.rego}>{obj.aircraft.reg}</span>
						<span className={styles.type}>{obj.aircraft.type}</span>
						<span className={styles.description}>{obj.aircraft.description}</span>
						<span className={styles.callsign}>{obj.callsign}</span>
						<span className={styles.text}>{obj.text.trim()}</span>
						<span className={styles.timestamp}>{dayjs(obj.timestamp).format('HH:mm D-MMM-YYYY')}</span>
						<span className={styles.mission}>{obj.mission}</span>
						<span className={styles.from}>{obj.from}</span>
						<span className={styles.to}>{obj.to}</span>
					</div>
				))}
			</div>
			<div ref={ref}></div>
		</main >
	)
}
