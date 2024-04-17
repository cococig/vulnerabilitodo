import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const user1 = await prisma.user.upsert({
		where: {
			name: "y_kira",
		},
		update: {},
		create: {
			name: "y_kira",
			password: "killer_queen",
			todo: {
				create: [
					{
						title: "筆跡の練習",
						description: "川尻浩作の筆跡を完璧に真似る",
						dueDate: new Date("1999/07/31"),
					},
					{
						title: "靴のサイズ変更",
						description: "靴のサイズを家族にバレないよう徐々に変更する",
						dueDate: new Date("1999/07/31"),
					},
					{
						title: "敵を始末する",
						description:
							"対象<br><ul><li>東方仗助</li><li>空条承太郎</li><li>広瀬康一</li><li>虹村億泰</li></ul>",
						dueDate: new Date("1999/07/31"),
					},
				],
			},
		},
	});
	const user2 = await prisma.user.upsert({
		where: {
			name: "dio",
		},
		update: {},
		create: {
			name: "dio",
			password: "the_world",
			todo: {
				create: [
					{
						title: "スタンドの練習",
						description: "時を止める時間をより長くする",
						dueDate: new Date("1989/01/31"),
					},
					{
						title: "強力なスタンド使いを探す",
						description:
							"ジョースターを始末できるスタンド使いを探す。使い手が貧弱な場合はディスクを保存する",
						dueDate: new Date("1989/01/31"),
					},
					{
						title: "エジプトの物件探し",
						description: "隠れ家の候補をいくつか探しておく",
						dueDate: new Date("1989/01/31"),
					},
				],
			},
		},
	});
	const user3 = await prisma.user.upsert({
		where: {
			name: "diabolo",
		},
		update: {},
		create: {
			name: "diabolo",
			password: "king_crimson",
			todo: {
				create: [
					{
						title: "娘を始末する",
						description:
							"信頼できる部下にトリッシュを移送させ、私自らの手で確実に始末する",
						dueDate: new Date("2001/04/02"),
					},
					{
						title: "写真の場所を見張る",
						description: "ドッピオに写真の場所を見張らせる",
						dueDate: new Date("2001/04/05"),
					},
					{
						title: "裏切り者を始末する",
						description: "ブチャラティのチームを始末する",
						dueDate: new Date("2001/04/06"),
					},
				],
			},
		},
	});
	const user4 = await prisma.user.upsert({
		where: {
			name: "e_pucchi",
		},
		update: {},
		create: {
			name: "e_pucchi",
			password: "white_snake",
			todo: {
				create: [
					{
						title: "天国へ到達する",
						description: "新月の日、天国へと到達する",
						dueDate: new Date("2012/03/23"),
					},
					{
						title: "記憶のDiscを回収する",
						description: "承太郎の記憶から天国へ到達する方法を調べる",
						dueDate: new Date("2011/11/30"),
					},
				],
			},
		},
	});
	const user5 = await prisma.user.upsert({
		where: {
			name: "test_user"
		},
		update:{},
		create: {
			name: "test_user",
			password: "test_password",
			todo: {
				create: [
					{
						title: "Todoテスト1",
						description: "Todoテスト内容1",
						dueDate: new Date()
					},
					{
						title: "Todoテスト2",
						description: "Todoテスト内容2",
						dueDate: new Date()
					},
					{
						title: "Todoテスト3",
						description: "Todoテスト内容3",
						dueDate: new Date()
					}
				]
			}
		},
	})
}

main()
	.catch(async (e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
