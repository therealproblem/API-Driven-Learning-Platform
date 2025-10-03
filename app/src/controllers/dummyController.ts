import type { Request, Response } from 'express';
import { insertBookmark } from '../db/services/bookmarksService';
import { insertCourse } from '../db/services/coursesService';
import { insertProgress } from '../db/services/progressService';
import { createUser } from '../db/services/usersService';
import { hash } from '../utils/hashing';

interface dummyVideo {
	id: string;
	duration: number;
	title: string;
	creatorName: string;
}

export const generateData = async (req: Request, res: Response) => {
	// create 4 users
	const user1 = await createUser('test1@example.com', hash('lxpUser1233!'), 'Alex Tan');
	const user2 = await createUser('test2@example.com', hash('lxpUser1234!'), 'Ben Lee');
	const user3 = await createUser('test3@example.com', hash('lxpUser1235!'), 'Danny Yeo');
	const user4 = await createUser('test4@example.com', hash('lxpUser1236!'), 'Felix Chua');

	// create 50 products from list of youtube video ids
	const videos: dummyVideo[] = [
		{ id: 'W_VV2Fx32_Y', duration: 1024, title: '', creatorName: '' },
		{ id: 'rGyGavlg6i4', duration: 613, title: '', creatorName: '' },
		{ id: '4KHiSt0oLJ0', duration: 151, title: '', creatorName: '' },
		{ id: 'DC471a9qrU4', duration: 100, title: '', creatorName: '' },
		{ id: 'g2o22C3CRfU', duration: 100, title: '', creatorName: '' },
		{ id: 'tVCYa_bnITg', duration: 101, title: '', creatorName: '' },
		{ id: 'rf60MejMz3E', duration: 100, title: '', creatorName: '' },
		{ id: 'qgRUr-YUk1Q', duration: 104, title: '', creatorName: '' },
		{ id: 'UafqYgRoIC0', duration: 110, title: '', creatorName: '' },
		{ id: 'L8CDt1J3DAw', duration: 103, title: '', creatorName: '' },
		{ id: 'K74l26pE4YA', duration: 104, title: '', creatorName: '' },
		{ id: 'm3OjWNFREJo', duration: 109, title: '', creatorName: '' },
		{ id: 'hwP7WQkmECE', duration: 117, title: '', creatorName: '' },
		{ id: 'uuOXPWCh-6o', duration: 111, title: '', creatorName: '' },
		{ id: 'scEDHsr3APg', duration: 116, title: '', creatorName: '' },
		{ id: 'NtRmIp4eMjs', duration: 116, title: '', creatorName: '' },
		{ id: 'YOlr79NaAtQ', duration: 398, title: '', creatorName: '' },
		{ id: 'nhBVL41-_Cw', duration: 124, title: '', creatorName: '' },
		{ id: '7d7-etf-wNI', duration: 123, title: '', creatorName: '' },
		{ id: 'lHhRhPV--G0', duration: 130, title: '', creatorName: '' },
		{ id: 'HZHHBwzmJLk', duration: 125, title: '', creatorName: '' },
		{ id: 'cWNEl4HE2OE', duration: 630, title: '', creatorName: '' },
		{ id: 'F0G9lZ7gecE', duration: 130, title: '', creatorName: '' },
		{ id: '7edR32QVp_A', duration: 130, title: '', creatorName: '' },
		{ id: 'sXQxhojSdZM', duration: 142, title: '', creatorName: '' },
		{ id: 'kpXKwDGtjGE', duration: 120, title: '', creatorName: '' },
		{ id: 'e1KpKBHJOrA', duration: 117, title: '', creatorName: '' },
		{ id: 'Gjnup-PuquQ', duration: 127, title: '', creatorName: '' },
		{ id: 'Tn6-PIqc4UM', duration: 128, title: '', creatorName: '' },
		{ id: 'Ata9cSC2WpM', duration: 120, title: '', creatorName: '' },
		{ id: 'PziYflu8cB8', duration: 127, title: '', creatorName: '' },
		{ id: 'JKxlsvZXG7c', duration: 125, title: '', creatorName: '' },
		{ id: 'cbB3QEwWMlA', duration: 136, title: '', creatorName: '' },
		{ id: 'UBUNrFtufWo', duration: 138, title: '', creatorName: '' },
		{ id: 'zQnBQ4tB3ZA', duration: 145, title: '', creatorName: '' },
		{ id: 'sw1Uy3zwsLs', duration: 140, title: '', creatorName: '' },
		{ id: '1BfCnjr_Vjg', duration: 511, title: '', creatorName: '' },
		{ id: 'sFsRylCQblw', duration: 490, title: '', creatorName: '' },
		{ id: 'Sklc_fQBmcs', duration: 712, title: '', creatorName: '' },
		{ id: 'UgEaJBz3bjY', duration: 211, title: '', creatorName: '' },
		{ id: 'eZ74x6dVYes', duration: 128, title: '', creatorName: '' },
		{ id: 'O0gmXbN7lVE', duration: 158, title: '', creatorName: '' },
		{ id: 'r_MpUP6aKiQ', duration: 834, title: '', creatorName: '' },
		{ id: '-B58GgsehKQ', duration: 712, title: '', creatorName: '' },
		{ id: '-txKSRn0qeA', duration: 713, title: '', creatorName: '' },
		{ id: '42iQKuQodW4', duration: 173, title: '', creatorName: '' },
		{ id: 'eIQh02xuVw4', duration: 142, title: '', creatorName: '' },
		{ id: 'OzDG68VvPxY', duration: 141, title: '', creatorName: '' },
		{ id: '-MTSQjw5DrM', duration: 680, title: '', creatorName: '' },
		{ id: 'WmR9IMUD_CY', duration: 679, title: '', creatorName: '' }
	];

	for (const i in videos) {
		if (!videos[i]) continue;
		const res = await fetch(
			`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videos[i].id}&format=json`
		).then((d) => d.json());
		videos[i].title = res.title;
		videos[i].creatorName = res.author_name;

		await insertCourse(
			videos[i]!.id,
			videos[i]!.title,
			videos[i]!.duration,
			videos[i]!.creatorName
		);
	}

	// make some progress for 3 users
	const user1Progress: dummyVideo[] = [
		{ id: 'm3OjWNFREJo', duration: 19, title: '', creatorName: '' },
		{ id: 'hwP7WQkmECE', duration: 11, title: '', creatorName: '' },
		{ id: 'uuOXPWCh-6o', duration: 111, title: '', creatorName: '' },
		{ id: 'scEDHsr3APg', duration: 16, title: '', creatorName: '' },
		{ id: 'NtRmIp4eMjs', duration: 116, title: '', creatorName: '' },
		{ id: 'YOlr79NaAtQ', duration: 39, title: '', creatorName: '' },
		{ id: 'sXQxhojSdZM', duration: 42, title: '', creatorName: '' },
		{ id: 'kpXKwDGtjGE', duration: 20, title: '', creatorName: '' },
		{ id: 'e1KpKBHJOrA', duration: 117, title: '', creatorName: '' },
		{ id: 'Gjnup-PuquQ', duration: 127, title: '', creatorName: '' },
		{ id: 'Tn6-PIqc4UM', duration: 28, title: '', creatorName: '' },
		{ id: 'DC471a9qrU4', duration: 100, title: '', creatorName: '' },
		{ id: 'g2o22C3CRfU', duration: 80, title: '', creatorName: '' },
		{ id: 'tVCYa_bnITg', duration: 101, title: '', creatorName: '' },
		{ id: 'rf60MejMz3E', duration: 100, title: '', creatorName: '' },
		{ id: 'qgRUr-YUk1Q', duration: 15, title: '', creatorName: '' },
		{ id: 'UafqYgRoIC0', duration: 10, title: '', creatorName: '' },
		{ id: 'L8CDt1J3DAw', duration: 10, title: '', creatorName: '' },
		{ id: 'K74l26pE4YA', duration: 104, title: '', creatorName: '' }
	];
	const user2Progress: dummyVideo[] = [
		{ id: 'cbB3QEwWMlA', duration: 36, title: '', creatorName: '' },
		{ id: 'UBUNrFtufWo', duration: 38, title: '', creatorName: '' },
		{ id: 'zQnBQ4tB3ZA', duration: 45, title: '', creatorName: '' },
		{ id: 'sw1Uy3zwsLs', duration: 40, title: '', creatorName: '' },
		{ id: '-B58GgsehKQ', duration: 700, title: '', creatorName: '' },
		{ id: '-txKSRn0qeA', duration: 73, title: '', creatorName: '' },
		{ id: '42iQKuQodW4', duration: 73, title: '', creatorName: '' },
		{ id: 'eIQh02xuVw4', duration: 42, title: '', creatorName: '' },
		{ id: 'OzDG68VvPxY', duration: 41, title: '', creatorName: '' },
		{ id: 'W_VV2Fx32_Y', duration: 102, title: '', creatorName: '' },
		{ id: 'rGyGavlg6i4', duration: 613, title: '', creatorName: '' },
		{ id: '4KHiSt0oLJ0', duration: 151, title: '', creatorName: '' },
		{ id: 'DC471a9qrU4', duration: 10, title: '', creatorName: '' },
		{ id: 'g2o22C3CRfU', duration: 10, title: '', creatorName: '' },
		{ id: 'tVCYa_bnITg', duration: 101, title: '', creatorName: '' },
		{ id: 'rf60MejMz3E', duration: 100, title: '', creatorName: '' },
		{ id: 'qgRUr-YUk1Q', duration: 14, title: '', creatorName: '' },
		{ id: 'UafqYgRoIC0', duration: 80, title: '', creatorName: '' },
		{ id: 'L8CDt1J3DAw', duration: 93, title: '', creatorName: '' }
	];
	const user3Progress: dummyVideo[] = [
		{ id: 'cbB3QEwWMlA', duration: 96, title: '', creatorName: '' },
		{ id: 'UBUNrFtufWo', duration: 98, title: '', creatorName: '' },
		{ id: 'zQnBQ4tB3ZA', duration: 95, title: '', creatorName: '' },
		{ id: 'sw1Uy3zwsLs', duration: 90, title: '', creatorName: '' },
		{ id: '1BfCnjr_Vjg', duration: 401, title: '', creatorName: '' },
		{ id: 'sFsRylCQblw', duration: 90, title: '', creatorName: '' },
		{ id: 'Sklc_fQBmcs', duration: 62, title: '', creatorName: '' },
		{ id: 'UgEaJBz3bjY', duration: 91, title: '', creatorName: '' },
		{ id: 'eZ74x6dVYes', duration: 28, title: '', creatorName: '' },
		{ id: 'O0gmXbN7lVE', duration: 150, title: '', creatorName: '' },
		{ id: '-MTSQjw5DrM', duration: 480, title: '', creatorName: '' },
		{ id: 'WmR9IMUD_CY', duration: 369, title: '', creatorName: '' },
		{ id: 'cWNEl4HE2OE', duration: 630, title: '', creatorName: '' },
		{ id: 'F0G9lZ7gecE', duration: 40, title: '', creatorName: '' },
		{ id: '7edR32QVp_A', duration: 50, title: '', creatorName: '' },
		{ id: 'sXQxhojSdZM', duration: 62, title: '', creatorName: '' }
	];

	for (const p of user1Progress) {
		await insertProgress(user1!.id, p.id, p.duration);
	}

	for (const p of user2Progress) {
		await insertProgress(user2!.id, p.id, p.duration);
	}

	for (const p of user3Progress) {
		await insertProgress(user3!.id, p.id, p.duration);
	}

	// bookmark videos, both with and without progress

	const user1Bookmarks: dummyVideo[] = [
		{ id: 'rGyGavlg6i4', duration: 613, title: '', creatorName: '' },
		{ id: '4KHiSt0oLJ0', duration: 151, title: '', creatorName: '' },
		{ id: 'DC471a9qrU4', duration: 100, title: '', creatorName: '' },
		{ id: 'g2o22C3CRfU', duration: 100, title: '', creatorName: '' },
		{ id: 'UafqYgRoIC0', duration: 110, title: '', creatorName: '' },
		{ id: 'L8CDt1J3DAw', duration: 103, title: '', creatorName: '' },
		{ id: 'm3OjWNFREJo', duration: 109, title: '', creatorName: '' },
		{ id: 'hwP7WQkmECE', duration: 117, title: '', creatorName: '' },
		{ id: 'NtRmIp4eMjs', duration: 116, title: '', creatorName: '' },
		{ id: '7d7-etf-wNI', duration: 123, title: '', creatorName: '' }
	];
	const user2Bookmarks: dummyVideo[] = [
		{ id: 'W_VV2Fx32_Y', duration: 1024, title: '', creatorName: '' },
		{ id: 'rGyGavlg6i4', duration: 613, title: '', creatorName: '' },
		{ id: '4KHiSt0oLJ0', duration: 151, title: '', creatorName: '' },
		{ id: 'DC471a9qrU4', duration: 100, title: '', creatorName: '' },
		{ id: 'g2o22C3CRfU', duration: 100, title: '', creatorName: '' },
		{ id: 'K74l26pE4YA', duration: 104, title: '', creatorName: '' },
		{ id: 'm3OjWNFREJo', duration: 109, title: '', creatorName: '' },
		{ id: '7edR32QVp_A', duration: 130, title: '', creatorName: '' },
		{ id: 'Ata9cSC2WpM', duration: 120, title: '', creatorName: '' },
		{ id: 'PziYflu8cB8', duration: 127, title: '', creatorName: '' },
		{ id: 'JKxlsvZXG7c', duration: 125, title: '', creatorName: '' },
		{ id: 'O0gmXbN7lVE', duration: 158, title: '', creatorName: '' },
		{ id: 'r_MpUP6aKiQ', duration: 834, title: '', creatorName: '' },
		{ id: 'OzDG68VvPxY', duration: 141, title: '', creatorName: '' },
		{ id: '-MTSQjw5DrM', duration: 680, title: '', creatorName: '' },
		{ id: 'WmR9IMUD_CY', duration: 679, title: '', creatorName: '' }
	];
	const user3Bookmarks: dummyVideo[] = [
		{ id: 'W_VV2Fx32_Y', duration: 1024, title: '', creatorName: '' },
		{ id: 'rGyGavlg6i4', duration: 613, title: '', creatorName: '' },
		{ id: '4KHiSt0oLJ0', duration: 151, title: '', creatorName: '' },
		{ id: 'DC471a9qrU4', duration: 100, title: '', creatorName: '' },
		{ id: 'uuOXPWCh-6o', duration: 111, title: '', creatorName: '' },
		{ id: 'NtRmIp4eMjs', duration: 116, title: '', creatorName: '' },
		{ id: 'cbB3QEwWMlA', duration: 136, title: '', creatorName: '' },
		{ id: 'eZ74x6dVYes', duration: 128, title: '', creatorName: '' },
		{ id: 'O0gmXbN7lVE', duration: 158, title: '', creatorName: '' },
		{ id: 'r_MpUP6aKiQ', duration: 834, title: '', creatorName: '' },
		{ id: '-B58GgsehKQ', duration: 712, title: '', creatorName: '' },
		{ id: '42iQKuQodW4', duration: 173, title: '', creatorName: '' },
		{ id: 'eIQh02xuVw4', duration: 142, title: '', creatorName: '' },
		{ id: '-MTSQjw5DrM', duration: 680, title: '', creatorName: '' },
		{ id: 'WmR9IMUD_CY', duration: 679, title: '', creatorName: '' }
	];
	const user4Bookmarks: dummyVideo[] = [
		{ id: 'W_VV2Fx32_Y', duration: 1024, title: '', creatorName: '' },
		{ id: 'rGyGavlg6i4', duration: 613, title: '', creatorName: '' },
		{ id: '4KHiSt0oLJ0', duration: 151, title: '', creatorName: '' },
		{ id: 'DC471a9qrU4', duration: 100, title: '', creatorName: '' },
		{ id: 'qgRUr-YUk1Q', duration: 104, title: '', creatorName: '' },
		{ id: 'UafqYgRoIC0', duration: 110, title: '', creatorName: '' },
		{ id: 'scEDHsr3APg', duration: 116, title: '', creatorName: '' },
		{ id: 'NtRmIp4eMjs', duration: 116, title: '', creatorName: '' },
		{ id: 'Gjnup-PuquQ', duration: 127, title: '', creatorName: '' },
		{ id: 'UBUNrFtufWo', duration: 138, title: '', creatorName: '' },
		{ id: 'zQnBQ4tB3ZA', duration: 145, title: '', creatorName: '' },
		{ id: 'O0gmXbN7lVE', duration: 158, title: '', creatorName: '' },
		{ id: 'r_MpUP6aKiQ', duration: 834, title: '', creatorName: '' },
		{ id: '-B58GgsehKQ', duration: 712, title: '', creatorName: '' },
		{ id: '-txKSRn0qeA', duration: 713, title: '', creatorName: '' },
		{ id: '-MTSQjw5DrM', duration: 680, title: '', creatorName: '' },
		{ id: 'WmR9IMUD_CY', duration: 679, title: '', creatorName: '' }
	];

	for (const b of user1Bookmarks) {
		await insertBookmark(user1!.id, b.id);
	}
	for (const b of user2Bookmarks) {
		await insertBookmark(user2!.id, b.id);
	}
	for (const b of user3Bookmarks) {
		await insertBookmark(user3!.id, b.id);
	}
	for (const b of user4Bookmarks) {
		await insertBookmark(user4!.id, b.id);
	}

	res.send(200);
};
