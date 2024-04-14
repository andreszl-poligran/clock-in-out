import React from "react";
import * as interfaces from '../../interfaces';


export const RecordItem: React.FC<interfaces.mark.IMark> = ({ name, document, entryDate, exitDate }) => {

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const options: any = {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true
		};
		return date.toLocaleDateString('es-ES', options);
	};

	return (
		<div className="p-1 mb-4 rounded-md">
			<p className="text-lg font-bold">{name} - {document}</p>
			<div className="flex justify-between text-sm">
				<p>Ingreso: {formatDate(entryDate)}</p>
				<p>Salida: {exitDate ? formatDate(exitDate) : 'Aun no sale'}</p>
			</div>
		</div>
	);
};

interface RecordsListProps {
	records: interfaces.mark.IMark[];
}

export const RecordsList: React.FC<RecordsListProps> = ({ records }) => {
	return (
		<div className="overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-200">
				{records.map((record, index) => (
					<div className="p-2" key={index}>
						<React.Fragment>
							<RecordItem {...record} />
							{index !== records.length - 1 && <hr className="my-4 border-gray-300" />}
						</React.Fragment>
					</div>
				))}
		</div>
	);
};

interface SearchResultsProps {
	results: interfaces.mark.IMark[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
	return (
		<div>
			{results.length > 0 ? (
				<>
					<hr className="my-4 border-gray-300 pb-5" />
					<RecordsList records={results} />
				</>
			) : null}
		</div>
	);
};